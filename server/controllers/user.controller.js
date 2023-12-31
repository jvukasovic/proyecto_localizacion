import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try{
        const userData = req.body;
        const createUserResult = await User.create(userData);
        res.status(200).json(createUserResult);
    }catch(e){
        res.status(400).json({
            "message": e.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        //if loginUserResult == nulo
        const loginUserResult = await User.findOne({email: req.body.email});
        const resultCompare = bcrypt.compareSync(req.body.password, loginUserResult.password)

        res.status(200).json({'resultcompare': resultCompare, 'userType': loginUserResult.type, 'userName': loginUserResult.userName});

    } catch (e) {
        res.status(400).json({
            "message": e.message
        })
    }
}

export { registerUser, loginUser };