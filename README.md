## System requirements
|  Name | Download link  |
|---|---|
|  Docker | [Get Docker](https://docs.docker.com/get-started/get-docker/)  |
| Docker Compose | [Get Docker Compose](https://docs.docker.com/compose/install/) |

## Project setup process
Copy & paste `.env.example` and rename it to `.env` <br/>
```
cp .env.example .env
```

In `.env` replace placeholders marked as `<value>` with actual values

After you have set the environment variables run (*on linux `sudo` might be required*):
```
docker compose up -d
```

After docker is done setting up containers you should be able to access the `rest-api` container.
````
docker compose logs rest-api
````
In the console output you should see something like : *REST API running on port: xyz*

## How to add packages
Since the entire application is running inside a docker container you must install all packages from inside the container
````
docker compose exec rest-api npm install <pacakge_name>
````
or you can first enter the container:
```` 
docker compose exec rest-api sh
````

and the run `npm install <pacakge_name>`

## Typescript gives error after package install
After you install a package and try to use it you may get a typescript error saying *Could not find a declaration file for module <lib-name>*

Solution is to install types as developer dependency for the pacakge library. The usual command to do so is:
```
npm i -D @types/<lib-name>
```

## Project architecture

[![](https://app.eraser.io/workspace/nN2BMoHWPFCd4n8nZSdp/preview?elements=KoZLXDZZ5JLkbWN_ETgD-w&type=embed)](https://app.eraser.io/workspace/nN2BMoHWPFCd4n8nZSdp?elements=KoZLXDZZ5JLkbWN_ETgD-w)

