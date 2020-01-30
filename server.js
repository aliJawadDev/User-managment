var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.pluralize(null);

const port = 1000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/DataBase', { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open', function () {});
app.use(cors())

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
},
  { versionKey: false });

var User = mongoose.model('Users', userSchema);

var postSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  tags: String,
  author: String,
},
{ versionKey: false });

var Post = mongoose.model('Posts', postSchema)

app.listen(port, () => console.log(`Listening on port ${port}`));



//get users


app.get('/getUser', async (req, res) => {
  try {
    var result = await User.find().exec();
    res.send(result);
}
catch (error){
    res.status(500).send(error);
}
})


//make a new user


app.post('/newUser', (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.save(function (err) {
    res.status(200).send({
      success: 'true',
      message: 'User Created',
      user,
    })
    if (err) {
      console.log(err)
    }
  })
})


//make posts

app.post('/newPost', (req, res) => {
  const post = new Post({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    tags: req.body.tags,
    author: req.body.author,
  })

  post.save(function (err) {
    res.status(200).send({
      success: 'true',
      message: 'Post Created',
      post,
    })
    if (err) {
      console.log(err)
    }
  })
})

//get posts

app.get('/getPosts', async (req, res) => {
  try {
    var result = await Post.find().exec();
    res.send(result);
}
catch (error){
    res.status(500).send(error);
}
})

//get unique user with id

app.get('/profile/:id', function (req, res) {
  User.findById(req.params.id)
  .then(userFound =>{
    if(!userFound) {
      return res.status(404).end();
    }
    return res.status(200).send(userFound);
  })
  .catch(err => res.status(404).send(err));
})

app.get('/delete/:id', function (req, res) {
  Post.findByIdAndDelete(req.params.id)
  .then(postFound =>{
    if(!postFound) {
      return res.status(404).end();
    }
    return res.status(200).send(postFound);
  })
  .catch(err => res.status(404).send(err));
})