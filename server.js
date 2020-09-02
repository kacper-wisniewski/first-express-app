const express = require('express');
const path = require('path');

const app = express();

const isLogged = () => {
  return false;  
};

app.use('/user', (req, res, next) => {
  if (isLogged()) next();
  else res.send('You need to be logged');
});

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/home', (req, res) => {
  res.show('index.html')
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/user/panel', (req, res) => {
  res.show('user/panel.html');
});

app.get('/user/settings', (req, res) => {
  res.show('user/settings.html');
});

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404-not-found.html'));
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});