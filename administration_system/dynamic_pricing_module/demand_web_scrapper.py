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

    def define_room(self, room_type):
        adults = 2
        rooms = 1
        if room_type == 'STANDARD':
            adults = 2
            rooms = 1
        elif room_type == 'SINGLE':
            adults = 1
            rooms = 1
        return (adults, rooms)

    def prepare_request(self, date_in, date_out, room_type):
        adults, rooms = self.define_room(room_type)

        basic_url = "https://www.booking.com/searchresults.pl.html?aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaLYBiAEBmAEeuAEXyAEM2AED6AEBiAIBqAIDuALn9o_vBcACAQ&tmpl=searchresults"
        checkin_year = "&checkin_year=" + str(date_in.year)
        checkin_month = "&checkin_month=" + str(date_in.month)
        checkin_monthday = "&checkin_monthday=" + str(date_in.day)
        checkout_year = "&checkout_year=" + str(date_out.year)
        checkout_month = "&checkout_month=" + str(date_out.month)
        checkout_monthday = "&checkout_monthday=" + str(date_out.day)
        tmp = "&city=-510625&class_interval=1&dest_id=-510625&dest_type=city&from_sf=1"
        group_adults = "&group_adults=" + str(adults)
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
        date_range = pd.date_range(first_date, last_date - timedelta(days=1))

        if first_date > last_date:
            raise Exception('Data początkowa jest późniejsza niż końcowa')
        if 14 > date_range.__len__() > 365:
            raise Exception('Wprowadzony okres czasu jest za długi (powyżej 365 dni lub poniżej dwóch tygodni)')
        if datetime.datetime.now() < first_date < datetime.datetime.now() + timedelta(days=10):
            raise Exception('Przeszukiwanie możliwe tylko dla przyszłego okresu oddalonego o minimum 10 dni teraźniejszej daty ')
        if last_date > datetime.datetime.now() + timedelta(days=365):
            raise Exception('Ostatnia data przeszukiwania nie może być bardziej odległa niż o rok od aktualnej daty')

        for single_date in date_range:
            self.prepare_data(single_date, single_date + timedelta(days=1), room_type)
            self.all_data[str(single_date.date())] = self.extract_data_from_html()
        return self.save_data_to_df()

    def export_data_to_csv(self, csv_file_name='ceny_konkurencji', dir_name='output_data'):
        if self.all_data_df is None:
            raise Exception('Brak wyników przeszkukiwania w postaci DataFrame')
        self.all_data_df.to_csv(
            '{0}/{1}_{2}.csv'.format(dir_name, csv_file_name, str(datetime.datetime.now().date())), sep='|')
