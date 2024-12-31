require('dotenv').config();
const mysql = require('mysql2');

const express = require('express');
const app = express();
PORT = process.env.PORT || 3000 ;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//------------------------MiddleWare-------------------------------------------------------------------
//to serve public files to client
app.use(express.static(__dirname+'/public'));

//to parse json from POST data
app.use(express.json())

//to parse json from POST when url encoded (..like from a form)
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
  });
//---------------------------------------------------------------------------------------------


//to get data from get method
 app.get('/data',(req,res)=>{
  res.send('This is the data the SERVER received through GET '+req.query.name );
  console.log("the  query data ",req.query.name)
 });

  //to get data from post method
  app.post('/data',(req,res)=>{
   
    res.send('This is the data the SERVER received through POST : '+req.body.age);
    console.log('POST data',req.body);
  });


// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',        // MySQL server (localhost in most cases)
  user: 'root',             // MySQL username
  password: '', // MySQL password
  database: 'test'        // The database you want to connect to
});

// Connect to MySQL database
db.connect(err=>{
  if(err){
    console.log("there is error while connecting....",err.stack);
    return;
  }
  console.log('connection success ',db.threadId);
})


//to fetch all data from a db
app.post('/fetchData',(req,res)=>{
  const query = 'SELECT * FROM users';
  db.query(query,(err,results)=>{
    if(err){
      //to set status as 500
      res.status(500).send('Internal Server Error');
      console.log('Something went Wrong with query',err.stack);
      return;
    }
    //to send data as json
    res.json(results);
  })
})



