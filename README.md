# Tech stack
* React
* Express
* Puppeteer
* Material UI
* Docker (optional)
# Pre-Requisites
- Ubuntu 20.0.4 LTS (if you work with windows, find equivalent commands)
- Nodejs (16.x.x)
- Docker (optional)
# Run
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

Create .env file:
```sh
$ touch server/config/.env
```

Ejemplo de .env:
```.env
ACCOUNT_EMAIL="your_email"
ACCOUNT_PASSWORD="your_password"
```

Run services:
```sh
$ cd server && npm run start
$ cd client && npm run start
```