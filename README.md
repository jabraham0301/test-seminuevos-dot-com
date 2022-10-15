## Tech stack
* React
* Express
* Puppeteer
* Material UI
* Docker (optional)
## Pre-Requisites
- Ubuntu 20.0.4 LTS (if you work in windows,find equivalent commands)
- Nodejs (16.x.x)
- Docker (optional if you want spin docker containers)

## Run
Clone repository:
```sh
$ git clone https://github.com/jabraham0301/test-seminuevos-dot-com.git
```

Install `node_modules`:
```sh
$ cd test-seminuevos-dot-com
$ cd server && npm i
$ cd client && npm i
```
Crear un archivo .env para las variables de entorno, en este caso las credenciales de la cuenta en la que se van a hacer los posts:
```sh
$ touch server/config/.env
```
Ejemplo de .env:
```.env
ACCOUNT_EMAIL="your_email"
ACCOUNT_PASSWORD="your_password"
```
Ejecutar los servicios:
```sh
$ cd server && npm run start
$ cd client && npm run start
```
