from pathlib import Path

from bs4 import BeautifulSoup
import requests
import pandas as pd
import re
from datetime import date, timedelta
import time
import datetime


class HotelPricesCollector:

    def __init__(self):
        self.soup_html = None
        self.all_data = {}
        self.all_data_df = None
        self.dates = []

    def prepare_request(self, date_in, date_out, num_of_adult_guests, rooms = 1):
        basic_url = "https://www.booking.com/searchresults.pl.html?aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaLYBiAEBmAEeuAEXyAEM2AED6AEBiAIBqAIDuALn9o_vBcACAQ&tmpl=searchresults"
        checkin_year = "&checkin_year=" + str(date_in.year)
        checkin_month = "&checkin_month=" + str(date_in.month)
        checkin_monthday = "&checkin_monthday=" + str(date_in.day)
        checkout_year = "&checkout_year=" + str(date_out.year)
        checkout_month = "&checkout_month=" + str(date_out.month)
        checkout_monthday = "&checkout_monthday=" + str(date_out.day)
        tmp = "&city=-510625&class_interval=1&dest_id=-510625&dest_type=city&from_sf=1"
        group_adults = "&group_adults=" + str(num_of_adult_guests)
        group_children = "&group_children=" + str(0)
        selected_currency = "&selected_currency=" + 'PLN'
        no_rooms = "&no_rooms=" + str(rooms)
        other = '''&raw_dest_type=city&room1=A%2CA&sb_price_type=total&shw_aparth=1&slp_r_match=0&src=searchresults&srpvid=00f87ca86efc01a5&ss=Krak%C3%B3w&ssb=empty&ssne=Krak%C3%B3w&ssne_untouched=Krak%C3%B3w&top_ufis=1&nflt=class%3D5%3Bht_id%3D204%3B&rdf='''

        url = basic_url + checkin_year + checkin_month + checkin_monthday + checkout_year + checkout_month + checkout_monthday + tmp + group_adults + group_children + selected_currency + no_rooms + other
        header = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"}

        return (url, header)

    def prepare_data(self, date_in, date_out, room_type):
        url, header = self.prepare_request(date_in, date_out, room_type)
        page = requests.get(url, headers=header)
        self.soup_html = BeautifulSoup(page.content, 'lxml')

    def extract_data_from_html(self):
        collected_data = {}
        data_object = self.soup_html.findAll('div', class_=['sr_item', 'sr_item_new sr_item_default sr_property_block',
                                                            'sr_flex_layout'])
        for obj in data_object:
            try:
                name = obj.findAll('span', {'class': ['sr-hotel__name']})
                price = obj.findAll('div', {'class': ['bui-price-display__value', 'prco-inline-block-maker-helper'],
                                            'aria-hidden': ['true']})
                if price:
                    collected_data[name[0].get_text()[1:-1]] = (price[0].get_text()[1:-4]).replace(' ', '')
            except:
                raise Exception('Niespodziewany błąd podczas przeszukiwania dokumentów html')
        return collected_data

    def save_data_to_df(self):
        if self.all_data is None:
            raise Exception('Brak danych wynikowych możliwych do zapisu')
        self.all_data_df = pd.DataFrame(self.all_data)
        self.all_data_df.index.name = 'hotel'
        return self.all_data_df

    def collect_data_in_range(self, from_date, to_date, room_type):
        first_date = pd.to_datetime(from_date)
        last_date = pd.to_datetime(to_date)
        self.dates.append(first_date.date())
        self.dates.append(last_date.date())
        self.dates.append(room_type)
        date_range = pd.date_range(first_date, last_date)

        for single_date in date_range:
            self.prepare_data(single_date, single_date + timedelta(days=1), room_type)
            self.all_data[str(single_date.date())] = self.extract_data_from_html()
        return self.save_data_to_df()

    def export_data_to_csv(self, csv_file_name='ceny_konkurencji', base_dir_name='output_data_dynamic_pricing'):
        if self.all_data_df is None:
            raise Exception('Brak wyników przeszkukiwania w postaci DataFrame')
        dir_name = Path('{0}/{1}_{2}'.format(base_dir_name, str(self.dates[0]), str(self.dates[1])))
        dir_name.mkdir(exist_ok=True)
        self.all_data_df.to_csv(
            '{0}/{1}_osobowy_{2}_{3}.csv'.format(dir_name,self.dates[2], csv_file_name, str(datetime.datetime.now().date())), sep='|')
