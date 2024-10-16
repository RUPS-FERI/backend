## Project setup process

Copy & paste `.env.example` and rename it to `.env` <br/>
```
cp .env.example .env
```

In `.env` replace placeholders marked as `<value>` with actual values

After you have set the environment variables run:
```
docker compose up -d
```

## Run program
### Developer mode
```
npm run start:dev
```
### Production mode
```
npm run start
```

## Project architecture

[![](https://app.eraser.io/workspace/nN2BMoHWPFCd4n8nZSdp/preview?elements=KoZLXDZZ5JLkbWN_ETgD-w&type=embed)](https://app.eraser.io/workspace/nN2BMoHWPFCd4n8nZSdp?elements=KoZLXDZZ5JLkbWN_ETgD-w)

## Typescript gives error after package install

After you install a package and try to use it you may get a typescript error saying *Could not find a declaration file for module <lib-name>*

Solution is to install types as developer dependency for the pacakge library. The usual command to do so is:
```
npm i -D @types/<lib-name>
```
