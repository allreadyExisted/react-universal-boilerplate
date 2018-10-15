import { config } from 'config'
import express from 'express'
import nodemailer from 'nodemailer'

export const apiRouter = express.Router()

apiRouter
  .route('/callback')
  .post((req, res) => {
    const { host, port, login, pass, subject } = config.mail

    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user: login,
        pass
      }
    })

    const { name, lastName, mobileNumber, email, message } = req.body

    const mailOptions = {
      from: '"Some Site" <info@some.site>', // sender address
      to: subject, // list of receivers
      replyTo: email,
      subject: 'Some Site Form', // Subject line
      text: message, // plain text body
      html: `
        Имя: ${name}<br />
        Фамилия: ${lastName}<br />
        Номер мобильного телефона: ${mobileNumber}<br />
        Email: ${email}<br />
        Message: ${message}
      ` // html body
    }

    transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        res.sendStatus(500)
        return console.log(error)
      }

      console.log('Message %s sent: %s', info.messageId, info.response)
      res.end()
    })
})