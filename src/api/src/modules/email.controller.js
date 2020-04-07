import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    }
});

export const getPasswordResetURL = (userId, token) =>
    `https://odas.com/reset/password/${userId}/${token}`;

export const resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_LOGIN;
    const to = user.email;
    const subject = 'Yet Another Forgotten Password';
    const html = `
        <p>Hey, ${user.firstname || user.login}!</p>
        <p>This is the link to reset your password:</p>
        <a href=${url}>${url}</a>
        <p>This link will expire in 1 hour.</p>
    `;

    return { from, to, subject, html };
};

export const newIpConnectedTemplate = (user, ip) => {
    const from = process.env.EMAIL_LOGIN;
    const to = user.email;
    const subject = 'Unknown IP has connected to your account';
    const html = `
        <p>Hey, ${user.firstname || user.login}!</p>
        <p>This ip: ${ip} has connected to your account! Better change your password!</p>
    `;

    return { from, to, subject, html };
};

export const makeToken = ({ password, _id }) => {
    const secret = password;
    return jwt.sign({ userId: _id }, secret, { expiresIn: 3600 });
};