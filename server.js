const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const PORT = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const dbConnectionString =
  'mongodb+srv://hstorres96:Ely6Z46d2W02BXWm@cluster0.ae7mzee.mongodb.net/?retryWrites=true&w=majority';

let db, quotes;
MongoClient.connect(dbConnectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log('Connected to database');
    db = client.db('favorite-quotes');
    quotes = db.collection('quotes');
  }
);

app.get('/', (request, response) => {
  db.collection('quotes')
    .find()
    .toArray()
    .then((data) => {
      response.render('index.ejs', { info: data });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/addQuote', (request, response) => {
  console.log(request.body);
  db.collection('quotes')
    .insertOne({ author: request.body.author, quote: request.body.quote })
    .then((result) => {
      console.log('added quote');
      response.redirect('/');
    })
    .catch((err) => console.error(err));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
