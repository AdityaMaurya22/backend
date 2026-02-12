const express = require('express')
const userModel = require('../src/models/user.model')
const authRoutes = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


authRoutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const ifUserExist = await userModel.findOne({ email: email })

    if (ifUserExist) {
        return res.status(400).json({
            message: 'Email already exists'
        })
    }

    const hashPassword = crypto.createHash("sha512").update(password).digest("binary")

    const user = await userModel.create({
        name: name,
        email: email,
        password: hashPassword
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: 'User registered successfully',
        user,
        token
    })

})

authRoutes.post('/login', async (req,res)=>{
    const {email, password} = req.body

    const user = await userModel.findOne({
        email: email
    })

    if(!user){
        return res.status(400).json({
            message: 'User not found'
        })
    }

    const userPassword = user.password === crypto.createHash("sha512").update(password).digest("binary")

    if(!userPassword){
        return res.status(400).json({
            message: 'Invalid credentials'
        })
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: 'User logged in successfully',
        user,
        token
    })
})

authRoutes.post("/protected", async (req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
        message: 'Protected route accessed successfully'    
    })
})

module.exports = authRoutes