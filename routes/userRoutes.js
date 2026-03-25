import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.get('/',getUsers)
userRouter.get('/:id',getUser)
userRouter.post('/add',createUser)
userRouter.put('/update/:id',updateUser)
userRouter.delete('/del/:id',deleteUser)

export default userRouter