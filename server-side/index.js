const express = require('express')
const app = express()

app.listen(5000, function (req, res) {
  console.log("Server is listening in PORT : 5000")
})

app.get("/",(req,res)=>{
    res.send('Hello World from Node API');
});
