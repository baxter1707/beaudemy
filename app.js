const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary');
const models = require('./models')
const mustacheExpress = require('mustache-express')
const methodOverride = require('method-override')
const expressValidator = require('express-validator')
const SERVER_CONFIGS = require('./constants/server')
const configureServer = require('./server')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const multer = require('multer');
const uuidv4 = require('uuid/v4')

const secret = 'klaksjkjcijdklaskn'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.engine('mustache', mustacheExpress())
app.use(methodOverride('_method'))
app.use(expressValidator())
app.use('/uploads', express.static('uploads'))
app.use('/public', express.static('public'))
app.set('view engine', 'mustache')
app.set('views', './views')

configureServer(app)

cloudinary.config({
  cloud_name: 'msbcloud',
  api_key: '131442994844617',
  api_secret: 'U1QFoXm8W0qx9PZ2AGmTtcee7pQ'
});



const storage = multer.diskStorage({
      destination : './uploads/',
      filename: ( (req, file, cb) => {

       const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
       cb(null, newFilename);
     }),
   });

  const upload = multer({storage :storage});







app.get('/', (req,res) => {
  res.render('home')
})

app.get('/jsonTeachers', (req,res) => {
  models.teachers.findAll({
    order: [
      ['id']
    ]
  }).then((teacher) =>{
    res.json({teachers:teacher})
  })
})
app.post('/StudentSubscribe', (req,res) => {
  models.videos.create({
    url:req.body.url,
    studentid:req.body.studentid,
    courseName: req.body.courseName,
    tag: req.body.tag,
    courseDescription: req.body.courseDescription
  })

  res.json({success : true})

})

app.post('/VideoUpload', (req,res) => {
  models.videos.create({
    url:req.body.url,
    teacherId:req.body.teacherId,
    courseName: req.body.courseName,
    tag: req.body.tag,
    courseDescription: req.body.courseDescription

  })
})

app.get('/jsonVideos', (req,res) => {
  models.videos.findAll({
    order: [
      ['teacherId']
    ]
  }).then((video) =>{
    res.json({videos:video})
  })
})




app.post('/SignUp', (req,res) => {
  models.teachers.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    bio: req.body.bio,
    field: req.body.field,
    user_name:req.body.user_name,
    password:req.body.password
  }).then((teacher) => {
    let myToken = jwt.sign({teacher:teacher.id},
    secret,
    {expiresIn:'1h'});
     // console.log(myToken)
    res.send(myToken)
  })
})

app.post('/Login', (req,res) => {
  models.teachers.findOne( {where: {email: req.body.email}} )
  .then(teacher => {
    const valid = bcrypt.compare(req.body.password, teacher.password)
    if(valid) {
      let myToken = jwt.sign(
        {
          uid: teacher.id,
          username: teacher.user_name
        },
        secret
      )
      console.log(myToken)
      res.status(200).json({
        success: true,
        uid: teacher.id,
        username: teacher.username,
        myToken
      })
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid!"})
    }
  }) .catch(err => {
    res
      .status(400)
      .json ({success: false, message: "Invalid"})
  })
})



app.post('/LoginStudent', (req,res) => {
  models.students.findOne( {where: {email: req.body.email}} )
  .then(student => {
    const valid = bcrypt.compare(req.body.password, student.password)
    if(valid) {
      let myToken = jwt.sign(
        {
          uid: student.id,
          username: student.userName
        },
        secret
      )
      console.log(myToken)
      res.status(200).json({
        success: true,
        uid: student.id,
        username: student.userName,
        myToken
      })
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid!"})
    }
  }) .catch(err => {
    res
      .status(400)
      .json ({success: false, message: "Invalid"})
  })
})


app.post('/StudentSignUp', (req,res) => {
  models.students.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    field: req.body.field,
    userName:req.body.userName,
    password:req.body.password
  }).then((student) => {
    let myToken = jwt.sign({student:student.id},
    secret,
    {expiresIn:'1h'});
     // console.log(myToken)
    res.send(myToken)
  })
})



app.listen(SERVER_CONFIGS.PORT, error =>{
  if (error) throw error;
  console.log('Serving is running on port: ' + SERVER_CONFIGS.PORT)
})
