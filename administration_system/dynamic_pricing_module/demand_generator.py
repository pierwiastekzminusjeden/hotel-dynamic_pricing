import datetime

import numpy
import numpy as np
import pandas as pd
from pathlib import Path


class DemandGenerator:

    def __init__(self):
        self.demand = None
        self.concurency_prices = None

    def random_demand_generator(self, from_date, to_date, occupancy_level=12):
        start_date = pd.to_datetime(from_date)
        end_date = pd.to_datetime(to_date)

        if end_date <= start_date:
            raise Exception(
                "Data końcowa jest wcześnejsza lub równa dacie początkowej. Data końcowa musi być późniejsza niż data początkowa")

        PERIOD = 7.0
        # OCCUPANCY_LEVEL = 12.0
        SIGMA = 1.0
        TREND = 0.006
        A = 5.0
        PHI = 3 * np.pi / PERIOD

        num_of_days = (pd.to_datetime(end_date) - pd.to_datetime(start_date)).days
        days_normal_dist = np.linspace(1, num_of_days, num_of_days)
        noise = np.random.normal(size=len(days_normal_dist), scale=SIGMA)

        self.demand = map(round, occupancy_level + (TREND * days_normal_dist) + A * np.cos(
            2.0 * np.pi * days_normal_dist / PERIOD + PHI) + noise)
        self.demand = map(int, self.demand)
        self.demand = pd.DataFrame(self.demand, index=pd.date_range(start=start_date, end=end_date, closed='left'),
                                   columns=['reserved'])
        self.demand.index.name = 'date'
        return self.demand

    def import_concurency_prices_from_csv(self, csv_file_name, input_dir_name='output_data'):
        self.concurency_prices = pd.read_csv(input_dir_name + '/' + csv_file_name, sep='|', index_col=0)

    def demand_generator_from_concurency_prices(self, max_demand_value=20):
        if self.concurency_prices is None:
            raise Exception('Brak wczytanych danych w formacie DataFrame (concurency_prices)')
        df_concurency_prices_transposed = self.concurency_prices.T
        df_concurency_prices_transposed = df_concurency_prices_transposed.fillna(-1.0).astype('float64')
        for k in df_concurency_prices_transposed.keys():
            df_concurency_prices_transposed[k] = df_concurency_prices_transposed[k].replace(-1.0, max(
                df_concurency_prices_transposed[k]))
        tmp_df = df_concurency_prices_transposed

        for k in df_concurency_prices_transposed.keys():
            if max(df_concurency_prices_transposed[k]) == -1.0 and min(df_concurency_prices_transposed) == -1.0:
                print(df_concurency_prices_transposed)
                df_concurency_prices_transposed[k].drop()
                print(df_concurency_prices_transposed)

            tmp_df[k] = df_concurency_prices_transposed[k].map(lambda x: (
                        (x - min(df_concurency_prices_transposed[k])) / (
                        max(df_concurency_prices_transposed[k]) - min(df_concurency_prices_transposed[k]))))

        self.demand = tmp_df.mean(axis=1).to_frame()
        self.demand.index = self.demand.index.map(pd.to_datetime)
        self.demand.index.name = 'date'
        self.demand.columns = ['reserved']
        self.demand['reserved'] = self.demand['reserved'].map(lambda x: 7 + max_demand_value * x)
        self.demand['reserved'] = self.demand['reserved'].clip(0.0, max_demand_value)
        self.demand['reserved'] = self.demand['reserved'].map(round)
        print(self.demand.head(10))
        return self.demand

    def export_data_to_csv(self, csv_file_name, base_dir_name='output_data_dynamic_pricing'):
        if self.demand is None:
            raise Exception('Brak wyników formacie DataFrame')
        dir_name = Path('{0}/{1}_{2}'.format(base_dir_name, numpy.datetime_as_string(self.demand.index.values[0], unit='D'), numpy.datetime_as_string(self.demand.index.values[-1], unit='D')))
        dir_name.mkdir(exist_ok=True)

        print(dir_name)
        self.demand.to_csv('{0}/{1}_{2}.csv'.format(dir_name, csv_file_name, str(datetime.datetime.now().date())),
                           sep='|')
