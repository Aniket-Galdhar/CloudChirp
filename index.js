const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// basic route
app.get('/', (req,res) => {
    res.send('Server is running');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});