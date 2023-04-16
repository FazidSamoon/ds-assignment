import { MAIL_CREDENTIALS } from '../utils/config'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  auth: {
    user: MAIL_CREDENTIALS.USER,
    pass: MAIL_CREDENTIALS.PASS
  }
})

let mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/'
  }
})

export const sendMail = async (email, body, subject) => {
  let response = {
    body: {
      name: 'Mailgen',
      intro: 'Welcome to Best buy! We’re very excited to have you on board.',
      table: body
    }
  }

  let mail = mailGenerator.generate(response)
  const mailOptions = {
    from: MAIL_CREDENTIALS.USER,
    to: email,
    subject: subject,
    html: mail,
    attachments
  }
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}