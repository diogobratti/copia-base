const nodemailer = require('nodemailer');
const i18n = require('../i18n/texts');

const productionEmailConfig = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true
};

const testEmailConfig = (testAccount) => ({
  host: 'smtp.ethereal.email',
  auth: testAccount
});

async function createEmailConfig () {
  if (process.env.NODE_ENV === 'production') {
    return productionEmailConfig;
  } else {
    const testAccount = await nodemailer.createTestAccount();
    return testEmailConfig(testAccount);
  }
}

class Email {
  async sendEmail () {
    const emailConfig = await createEmailConfig();
    const transportador = nodemailer.createTransport(emailConfig);
    const info = await transportador.sendMail(this);

    if (process.env.NODE_ENV !== 'production') {
      console.log('URL: ' + nodemailer.getTestMessageUrl(info));
    }
  }
}

class EmailVerification extends Email {
  constructor (user, emailAddress) {
    super();
    this.from = process.env.EMAIL_FROM;
    this.to = user.email;
    this.subject = i18n.EMAIL_VERIFICATION.SUBJECT;
    this.text = i18n.EMAIL_VERIFICATION.TEXT(emailAddress);
    this.html = i18n.EMAIL_VERIFICATION.HTML(emailAddress);
  }
}

class EmailPasswordChange extends Email {
  constructor (user, token) {
    super();
    this.from = process.emv.EMAIL_FROM;
    this.to = user.email;
    this.subject = i18n.EMAIL_PASSWORD_CHANGE.SUBJECT;
    this.text = i18n.EMAIL_PASSWORD_CHANGE.TEXT(token);
    this.html = i18n.EMAIL_PASSWORD_CHANGE.HTML(token);
  }
}

module.exports = { EmailVerification, EmailPasswordChange }
