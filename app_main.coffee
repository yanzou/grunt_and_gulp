express = require('express')
http = require('http')
path = require('path')
port = 5858


app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port)

console.log("---> app listening at port: #{port} ") 
