const nodemailer = require("nodemailer");
const gmail = require("./gmail.js");
const contacts = require("./contacts.js");

nodemailer.createTestAccount((err, account) => {
	let transporter = nodemailer.createTransport({
		host: gmail.smtp,
		port: 587,
		secure: false,
		auth: {
			user: gmail.username,
			pass: gmail.password,
		},
	});

	let mailOptions = {
		from: gmail.username,
		to: contacts.justin,
		subject: "Hello ✔",
		text: "Hello World, from Node JS!",
		html: "<strong>Hello World, from Node JS!</strong>",
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if(err) {
			throw err;
		}

		console.log("Message send: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	});
});
