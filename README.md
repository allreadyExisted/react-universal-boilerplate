# React Universal Boilerplate

Universal SEO-fiendly template.

## About

* React
* Express
* Redux (redux-handler)
* Router
* L18n
* Helmet
* RxJS
* Forms Builder
* Webpack
* Babel
* Typescript
* PostCSS
* TSLint
* Nodemailer

## Requirements

NodeJS 10^


## Installation

```bash
npm install
```


## Running Dev 

```bash
npm run dev
```

### With Browsersync

```bash
npm run dev:bsync
```

### With SSR

```bash
npm run dev:ssr
npm run dev:server
```

### With SSR + Browsersync

```bash
npm run dev:ssr-bsync
npm run dev:server
```

## Building and Running Production Server

```bash
npm run build
npm start
```

## Nodemailer settings

Work with ssr mode (dev:ssr + dev:server)

Gmail service
```bash
const { login, pass, subject } = cfg.mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: login,
    pass
  }
})
```

Other mail services
```bash
const { host, port, login, pass, subject } = cfg.mail
const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user: login,
    pass
  }
})
```

## Configs

Default application configs

* NODE_ENV=production
* HOST=0.0.0.0
* PORT=5001

Configs located in ./configs (.env.*)

Gmail service
* MAIL_LOGIN=some@gmail.com
* MAIL_PASS=password123
* MAIL_SUBJECTS=some@gmail.com

Other mail services (example)
* MAIL_HOST=mail.adm.tools
* MAIL_PORT=2233
* MAIL_LOGIN=mail@mail.mail
* MAIL_PASS=password123
* MAIL_SUBJECTS=mail@mail.mail