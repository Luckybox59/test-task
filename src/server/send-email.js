import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lucky.test.mail.send@gmail.com',
    pass: '654ppp321',
  },
});

export default (to, link) => {
  const mailOptions = {
    from: 'lucky.test.mail.send59@gmail.com',
    to,
    subject: 'Подтвердите свой адрес эл. почты',
    html: `<p>Подтвердите свой адрес эл. почты, чтобы получить доступ к уч. записи "ДДДДД", нажав на след. ссылку <a href="${link}">ссылка</a></p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};
