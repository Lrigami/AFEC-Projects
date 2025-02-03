const axios = require('axios');
const express = require('express');
const app = express();
require('dotenv').config();

const port = 3000;

app.get('/popular', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', { params: {api_key: process.env.TMDB_APIKEY}});
    res.send(response.data.results);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

app.get('/details/:movie_id', async (req, res) =>  {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.movie_id}?language=en-US`, {params :{api_key: process.env.TMDB_APIKEY}});
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});