const express = require('express');

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/api/', require('./app/post'));
// app.use('/api/get', require('./app/post'))

app.listen(PORT, () => {
    console.log(`Serrver is runnig on ${PORT}`);
});

