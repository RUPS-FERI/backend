FROM python:3.9-slim

WORKDIR /app

COPY ../../.env .env

RUN pip install psycopg2-binary python-dotenv requests pymongo

COPY ../../scripts/data/loader/load-coins.py load-coins.py

CMD ["python", "load-coins.py"]
CMD ["tail", "-f", "/dev/null"]