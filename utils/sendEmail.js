const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  admin,
  password,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REFRESH_TOKEN,
} = process.env;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);


const sendEmail = async (to, url, text) => {

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }

      console.log(token);

      resolve(token);
    });
  });

  const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    tls: {
      // ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    secure: true,
    port: 465,
    // secureConnection: false,
    logger: true,
    debug: true,
    auth: {
      type: "OAuth2",
      user: "amosmoyo5300@gmail.com",
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: admin,
    to: to,
    subject: "CONFIRMATION EMAIL",
    html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">

          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the AMOSMOYO TEST EMAIL AUTH.</h2>
          <p>Congratulations! You're almost set to start using AUTH.
            Just click the button below to validate your email address.
           </p>
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
    
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
           <div>${url}</div>
        </div>
            `,
  };

  await smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) {
      console.log(err, 111);
      return {error: "rrrrrrr"}
    }
    console.log("OK");

    return infor;
  });
};

module.exports = sendEmail;
