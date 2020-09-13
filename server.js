const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('formidable');
const fs = require('fs');
const app = express();

//app.use(bodyParser.urlencoded( { extended: 'true' }));

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

const isLogged = () => {
  return true;  
};

app.post('/contact/send-message', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    for (const file of Object.entries(files)) {
      const {author, sender, title, message} = fields;
      const design = file[1].name;
      if (author && sender && title && message && design) {
        res.render('contact', { isSent: true, fileName: design});
      } else {
        res.render('contact', { isError: true});
      }
    }
  });

  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/public/uploads/' + file.name;
  });
});

app.use('/user/:path', (req, res, next) => {
  if (isLogged()) res.render(`user/${req.params.path}`);
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
app.get('/contact', (req, res) => {
  res.render('contact',);
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