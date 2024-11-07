import json
import urllib.request
import os
import base64
import sys
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime

load_dotenv(dotenv_path='./.env')

# Load environment variables
mongo_uri = os.getenv('MONGO_URI')
mongo_db_name = os.getenv('MONGO_DB')

# Initialize MongoDB client and database
client = MongoClient(mongo_uri)
db = client[mongo_db_name]

def get_image_base64(image_url):
    try:
        response = requests.get(image_url)
        if response.status_code == 200:
            image_content = response.content  # Raw binary content
            image_base64 = base64.b64encode(image_content).decode('utf-8')  # Encode to Base64 string
            image_size_in_bytes = len(image_content)  # Image size in bytes
            return image_base64, image_size_in_bytes
        else:
            print(f"Failed to fetch image. Status code: {response.status_code}")
            return None, None
    except Exception as e:
        print(f"Error occurred: {e}")
        return None, None

try:
    # Load and filter the coin data from CoinMarketCap
    coin_list_raw = urllib.request.urlopen("https://s3.coinmarketcap.com/generated/core/crypto/cryptos.json").read()
    coins_list = list(filter(lambda x: bool(x[4]) is True and str(x[8]) != '' and bool(x[6]) is True, json.loads(coin_list_raw)['values']))
    total_coins = len(coins_list)

    # Insert file extension and mime type if they do not exist
    file_extension = db.fileextensions.find_one({"extension": "png"})
    if not file_extension:
        file_extension = db.fileextensions.insert_one({"extension": "png"}).inserted_id
    file_mime_type = db.filemimetypes.find_one({"type": "image/png"})
    if not file_mime_type:
        file_mime_type = db.filemimetypes.insert_one({"type": "image/png"}).inserted_id

    # Iterate over each coin and insert data
    for i, coin in enumerate(coins_list):
        external_id = coin[0]
        name = coin[1]
        code = coin[2]
        slug = coin[3]

        # Fetch image data
        image, image_size = get_image_base64(f'https://s2.coinmarketcap.com/static/img/coins/64x64/{external_id}.png')
        web_link = f'https://coinmarketcap.com/currencies/{slug}/'

        try:
            # Create link document
            link_id = db.links.insert_one({
                "name": name,
                "link": web_link,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }).inserted_id

            # Create file document
            file_id = db.files.insert_one({
                "name": f'{slug}-64x64.png',
                "size": image_size,
                "data": image,
                "extension": file_extension,
                "mime_type": file_mime_type,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }).inserted_id

            # Create coin content document
            coin_content_id = db.coincontents.insert_one({
                "links": [link_id],
                "files": [file_id]
            }).inserted_id

            # Insert coin document with content reference
            coin_id = db.coins.insert_one({
                "externalId": external_id,
                "code": code,
                "name": name,
                "slug": slug,
                "content": coin_content_id
            }).inserted_id


            coin_price_raw = urllib.request.urlopen(f'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id={external_id}&range=7D').read()
            coin_price_json = json.loads(coin_price_raw)['data']['points']
            for timestamp, point_data in coin_price_json.items():
                price = point_data['v'][0]
                volume = point_data['v'][1]
                marketCap = point_data['v'][2]
                date = datetime.utcfromtimestamp(int(timestamp)).strftime('%Y-%m-%dT%H:%M:%S.000Z')

                db.prices.insert_one({
                    "date": date,
                    "price": price,
                    "volume": volume,
                    "marketCap": marketCap,
                    "coin": coin_id
                })

        except Exception as e:
            print("Value already in database ... skipped")

        # Print progress bar
        progress = ((i + 1) / total_coins) * 100
        bar_length = 25
        filled_length = int(bar_length * (i + 1) // total_coins)
        bar = '=' * filled_length + '-' * (bar_length - filled_length)

        sys.stdout.write(f'\r[{bar}] {progress:.2f}% ({i + 1}/{total_coins})')
        sys.stdout.flush()

    client.close()

except Exception as e:
    print(f"Error: {e}")