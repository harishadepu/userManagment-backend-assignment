import db from "../config/db.js";

// get all users
export const getUsers = async(req,res)=>{
    const {search} = req.query
    let query = `SELECT * FROM users`;
    let params = []

    if(search){
        query += `WHERE name LIKE ? OR email LIKE ?`;
        params.push(`%${search}%,`,`%${search}%,`)
    }
    try {
        const users = db.prepare(query).all(...params)
        res.json({success:true,users})
    } catch (err) {
        res.json({success:false,message:err.message})
    }

}

// get user

export const getUser = async(req,res)=>{
    try {
        const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(req.params.id)
        if(!user){
            return res.json({success:false,message:'user not found'})
        }
        res.json({success:true,user})
    } catch (err) {
        res.json({success:false,message:err.message})
    }

}

// create user 

export const createUser = async(req,res)=>{
    const {name,email,age} = req.body
    if(!name || !email || !age){
        return res.json({success:false,message:"name,email and age require"})
    }
    try {
        const result = db.prepare(`
            INSERT INTO users (name,email,age) VALUES(?,?,?)`).run(name,email,age);
        const newUser = db.prepare(`SELECT * FROM users WHERE id=?`).get(result.lastInsertRowid)
        res.json({success:true,newUser})
    } catch (err) {
        res.json({success:false,message:err.message})
    }

}

//update user 

export const updateUser = async(req,res)=>{
    const {name,email,age} = req.body

    const existing = db.prepare(`SELECT * FROM users WHERE id=?`).get(req.params.id)

    if(!existing){
        return res.json({success:false,message:"user not found"})
    }
    
    try {
        db.prepare(`
            UPDATE users SET name=?,email=?,age=? WHERE id=?`).run(name || existing.name,email || existing.email, age || existing.age, req.params.id)
        const updateUser = db.prepare(`SELECT * FROM users WHERE id=?`).get(req.params.id)
        res.json({success:true,updateUser})
    } catch (err) {
        res.json({success:false,message:err.message})
    }

}

//delete user 

export const deleteUser = async(req,res)=>{
    let params = req.params.id

    try {

        const result = db.prepare(`DELETE FROM users WHERE id=?`).run(params)
        if(result.changes === 0){
            return res.json({success:false,message:"user not found"})
        }
        res.json({success:true,message:"user deleted successfully"})
    } catch (err) {
        res.json({success:false,message:err.message})
    }

}