const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

const isLogged = () => {
  return true;  
};

app.use('/user/:path', (req, res, next) => {
  if (isLogged()) res.render(`user/${req.params.path}`, { layout: 'dark' });
  else res.send('You need to be logged');
});

app.get('/', (req, res) => {
  res.render('index',);
});

app.get('/home', (req, res) => {
  res.render('index',);
});

app.get('/about', (req, res) => {
  res.render('about',);
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name : req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404-not-found');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});