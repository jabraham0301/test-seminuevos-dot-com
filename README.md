# Prueba puesto Desarrollador Fullstack
## About
Prueba para el puesto de Desarrollador Fullstack, aplicando conocimientos de webscrapping,backend y frontend.
## Tech stack
* React
* Express
* Puppeteer
* Material UI
* Docker (opcional)
## Pre-Requisites
Para correr el codigo, se tienen que llenar diferentes prerequisitos, los cuales son:
- Ubuntu 20.0.4 LTS (OS en el que se trabajo, si es windows, buscar comandos equivalentes)
- Nodejs instalado (16.x.x)
- Docker (opcional)
## Run
Clonar el repositorio:
```sh
$ git clone https://github.com/jabraham0301/test-seminuevos-dot-com.git
```
Descargar los `node_modules` de server y front:
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
