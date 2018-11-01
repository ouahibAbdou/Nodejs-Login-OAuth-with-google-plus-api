var cookieSession = require('cookie-session')
var express = require('express')
 
var app = express()
 
// app.set('trust proxy', 1) // trust first proxy
 
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
 
app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1
  console.log(req.session);
  // Write response
  res.end(req.session.views + ' views')
})

app.get('/logout', (req,res) => {
    req.session = null;
    req.session = {}
    req.session.views = 10;
    res.redirect('/');
})
 
app.listen(8000)