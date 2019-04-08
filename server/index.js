const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const massive = require('massive');
const quotesController = require('./controllers/quotesController');
const ratingController = require('./controllers/ratingController');

require('dotenv').config();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
    console.log('Connected To Database!');
  })
  .catch(error => console.log('Error in connecting to db', error));

// app.post('/api/allQuotes', quotesController.storeAllQuotes);

app.get('/api/smallQuote', quotesController.getSmallQuote);

app.get('/api/mediumQuote', quotesController.getMediumQuote);

app.get('/api/largeQuote', quotesController.getLargeQuote);

app.get('/api/raters/:id', ratingController.getQuoteRaters);

app.put('/api/rateQuote/:name', ratingController.rateCurrentQuote);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
