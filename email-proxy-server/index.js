// server side
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['https://sebastianlian.github.io', 'https://sebastianlian.github.io/BootstrapResume/'] }));
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Received request:", req.body); // Debugging line

    const { SERVICE_ID, TEMPLATE_ID, USER_ID } = process.env;
    console.log("Environment Variables:", { SERVICE_ID, TEMPLATE_ID, USER_ID }); // Debugging line

    try {
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: USER_ID,
            template_params: {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            },
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.response?.data || error.message);
        res.status(500).send('Email sending failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
