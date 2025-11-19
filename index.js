import express from 'express'
import router from './router/generate.js'
const app = express()


app.use(express.json())
app.use("/",router)
const port = 9000

app.listen(port,() => console.log(`Server run on ${port}`))