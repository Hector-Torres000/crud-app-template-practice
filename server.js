const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const PORT = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbConnectionString = process.env.DBstring;

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
  db.collection('quotes')
    .insertOne({
      author: request.body.author,
      quote: request.body.quote,
      likes: 0,
    })
    .then((result) => {
      console.log('added quote');
      response.redirect('/');
    })
    .catch((err) => console.error(err));
});

app.delete('/deleteQuote', (request, response) => {
  console.log(request.body);
  db.collection('quotes')
    .deleteOne({ author: request.body.authorName })
    .then((result) => {
      console.log('quote deleted');
      response.json('quote deleted');
    })
    .catch((err) => console.error(err));
});

app.put('/addLike', (request, response) => {
  db.collection('quotes')
    .updateOne(
      {
        author: request.body.authorName,
        quote: request.body.quotePassage,
        likes: request.body.likes,
      },
      {
        $set: {
          likes: request.body.likes + 1,
        },
      }
    )
    .then((data) => {
      response.json('Like Added');
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
