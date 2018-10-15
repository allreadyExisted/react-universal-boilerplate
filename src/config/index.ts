export const config = {
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 5001,

  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    login: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASS,
    subject: process.env.MAIL_SUBJECTS
  },

  cachePagesExpire: process.env.CACHE_PAGES_EXPIRE || 60 * 10
}