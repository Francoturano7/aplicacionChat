//crear servidor
const express =require(`express`)
const app = express()
const http=require(`http`)
const server = http.createServer(app)

//views engine
const handlebars=require(`express-handlebars`)
//import routes
const homeRouter=require(`./router/home.router`)
//import socket
const {Server}=require(`socket.io`)
const io=new Server(server)

const PORT=8080 || process.env.PORT

//public
app.use(express.static(__dirname+`/public`))

//views
app.engine(`handlebars`,handlebars.engine())
app.set(`view engine`, `handlebars`)
app.set(`views`,__dirname+`/views`)
//routes
app.use(`/home`,homeRouter)

let messages=[]

//socket  
io.on(`connection`,(socket)=>{
    console.log(`New user conectado`)
    socket.emit(`wellcome`,`Hola cliente bienvenido`)

    socket.on(`new-message`,(data)=>{
         console.log(data)
         messages.push(data)
         io.sockets.emit(`messages-all`,messages)
    })
})

server.listen(PORT,()=>{
    console.log(`server runing on port 8080`)
})