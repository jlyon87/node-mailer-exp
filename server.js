const nodemailer = require("nodemailer");
const gmail = require("./gmail.js");
const keys = require("./keys.js");
const contacts = require("./contacts.js");

let ACCESS_TOKEN = "";
let userTokens = {};

const setAccessToken = (err, token) => {
	if(err) {
		throw err;
	}

	ACCESS_TOKEN = token;
};

nodemailer.createTestAccount((err, account) => {
	let transporter = nodemailer.createTransport({
		host: gmail.smtp,
		port: 587,
		secure: false,
		ignoreTLS: true,
		auth: {
			type: "OAuth2",
			clientId: keys.gmail.client_id,
			clientSecret: keys.gmail.client_secret,
		},
	});

	// transporter.set("oauth2_provision_cb", (user, renew, setAccessToken) => {
	// 	console.log(user);
	// 	console.log(renew);
	// 	let accessToken = userTokens[user];
	// 	if(!accessToken) {
	// 		return setAccessToken(new Error("Unknown User"));
	// 	}
	// 	return setAccessToken(null, accessToken);
	// });

	transporter.on("token", token => {
		console.log("A new access token was generated");
		console.log("User: ", token.user);
		console.log("Access Token: ", token.accessToken);
		ACCESS_TOKEN = token.accessToken;
		console.log("Expires: ", new Date(token.expires));
	});

	let mailOptions = {
		from: gmail.username,
		to: contacts.justin,
		subject: "Hello ✔",
		text: "Hello World!",
		html: "<strong>Hello World!</strong>",
		auth: {
			user: gmail.username,
			refreshToken: ""
		},
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if(err) {
			throw err;
		}

		console.log("Message send: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	});
});
