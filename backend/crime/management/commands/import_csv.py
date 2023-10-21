from django.core.management.base import BaseCommand
import csv
from django.conf import settings
from crime.models import CrimeLocation
import os
from django.contrib.staticfiles import finders

class Command(BaseCommand):
    help = 'Import data from static CSV file into the database'

    def handle(self, *args, **kwargs):
        csv_file_path = os.path.join(settings.BASE_DIR, 'crime', 'static', 'h_m_data.csv')
        # If you want to ensure the file exists before proceeding
        if not os.path.exists(csv_file_path):
            print(f"File not found: {csv_file_path}")
            return

        with open(csv_file_path, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            next(reader)  # This skips the header row of the CSV file

            for row in reader:
                CrimeLocation.objects.create(longitude=row[0], latitude=row[1])
