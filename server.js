const express = require('express');
const app = express();
const { createItem, readItem } = require('./crud');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/stats', (req, res) => {
    const { date, category } = req.body;
    createItem(date, category, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.get('/stats', (req, res) => {
    readItem((err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.get('/stats/all', (req, res) => {
    readAllItems((err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(rows);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running`);
});
