const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());

const streamers = {
  kiara: 'chatterbugxo',
  lari: 'laribug',
  britt: 'brittballs',
  unknown: 'unknown',
};

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/api/:name', (request, response) => {
  const streamerName = request.params.name.toLowerCase();
  if (streamers[streamerName]) {
    response.json(streamers[streamerName]);
  } else {
    response.json(streamers.unknown);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
