const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const mailConfig = require('../constants/emailConfig');

export function sendEmail(email) {
    const number = Math.floor(Math.random() * 9000) + 1000;
    const from = '명지대 강의평가 시스템';
    const to = email;
    const subject = '명지대 강의평가 사이트 회원가입 인증';
    const html = '<p>인증번호는 ' + number + ' 입니다.\n';

    const mailOptions = {
        from,
        to,
        subject,
        html
    }

    const transporter = nodemailer.createTransport(smtpPool({
        service: mailConfig.service,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.password,
        },
        tls: {
            rejectUnauthorized: false,
        },
        maxConnections: 5,
        maxMessages: 10,
    }));

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    transporter.close();
}