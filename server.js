import express from 'express'
import userRouter from './routes/userRoutes.js'

const app = express()

app.use(express.json())

const port = 5000

app.get('/',(req,res)=>{
    res.send('server running')
})
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})