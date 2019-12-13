import datetime
from pathlib import Path

import numpy
import numpy as np
import pandas as pd
import scipy.optimize as optimize

from ..models import PriceReservationDate


class DynamicPricingOptimizer:

    def __init__(self, elasticity=-2.0, base_price=100.0, capacities_bucket=[5.0, 10.0, 15.0, 20.0]):
        self.capacities_bucket = capacities_bucket
        self.elasticity = elasticity
        self.nominal_price = base_price
        self.df_demand = None
        self.df_optimization_result = None

    def import_demand_from_file(self, dir_name, csv_file_name):
        self.df_demand = pd.read_csv(dir_name + '/' + csv_file_name, sep='|')

    def elasticity_demand_price(self, price, nominal_demand):
        return nominal_demand * (price / self.nominal_price) ** (self.elasticity)

    def function_to_optimalize(self, prices, nominal_demand):
        return (-1.0 * np.sum(prices * self.elasticity_demand_price(prices, nominal_demand=nominal_demand))) / 100

    def constraint_excess(self, prices, capacity=5, nominal_demand=35.0):
        return capacity - self.elasticity_demand_price(prices, nominal_demand=nominal_demand)

    def optimize(self):
        if self.df_demand is None:
            raise Exception('Brak wczytanych prognoz popytu')

        optimization_result = {}
        for capacity in self.capacities_bucket:
            nominal_demand = self.df_demand['reserved'].values
            init_res = self.nominal_price * np.ones(len(nominal_demand))
            # granice cen
            bounds = tuple((50.0, 350.0) for i in init_res)
            constraints = (
                {'type': 'ineq',
                 'fun': lambda x, capacity=capacity, nominal_demand=nominal_demand: self.constraint_excess(x,
                                                                                                           capacity=capacity,
                                                                                                           nominal_demand=nominal_demand)})
            result = optimize.minimize(self.function_to_optimalize, init_res, args=(nominal_demand), method='SLSQP',
                                       bounds=bounds, constraints=constraints)
            optimization_result[capacity] = result
        return optimization_result

    def save_optimize_to_df(self):
        optimization_result = self.optimize()
        nominal_demand = self.df_demand['reserved'].values
        time_array = np.linspace(1, len(nominal_demand), len(nominal_demand))
        self.df_optimization_result = pd.DataFrame(index=time_array)
        for capacity in optimization_result.keys():
            self.df_optimization_result = pd.concat([self.df_optimization_result,
                                                     pd.DataFrame(optimization_result[capacity]['x'],
                                                                  columns=['{}'.format(
                                                                      capacity / self.capacities_bucket[-1])],
                                                                  index=time_array)],
                                                    axis=1)
        self.df_optimization_result.index = self.df_demand.index
        self.df_optimization_result.index.name = 'date'
        return self.df_optimization_result

    def export_optimization_result_to_csv(self, csv_file_name, base_dir_name='output_data_dynamic_pricing'):
        if self.df_optimization_result is None:
            raise Exception('Brak wyników optymalizacji w formacie dataFrame')
        dir_name = Path('{0}/{1}_{2}'.format(base_dir_name, numpy.datetime_as_string(self.df_optimization_result.index.values[0], unit='D'), numpy.datetime_as_string(self.df_optimization_result.index.values[-1], unit='D')))
        dir_name.mkdir(exist_ok=True)
        self.df_optimization_result.to_csv(
            '{0}/{1}_{2}.csv'.format(dir_name, csv_file_name, str(datetime.datetime.now().date())), sep='|')

    def save_to_database(self):
        if self.df_optimization_result is None:
            raise Exception('Brak wyników optymalizacji')
        for index, row in self.df_optimization_result.iterrows():
            obj, created = PriceReservationDate.objects.get_or_create(date=pd.to_datetime(index).date())
            if created:
                obj.price_1_0 = row['1.0']
                obj.price_0_75 = row['0.75']
                obj.price_0_5 = row['0.5']
                obj.price_0_25 = row['0.25']
                obj.save(update_fields=['price_1_0', 'price_0_75', 'price_0_5', 'price_0_25'])
            else:
                obj = PriceReservationDate(date=pd.to_datetime(index).date(), price_1_0=row['1.0'],
                                           price_0_75=row['0.75'], price_0_5=row['0.5'], price_0_25=row['0.25'])
                obj.save()
