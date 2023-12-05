import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

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
        const loginUserResult = await User.findOne({email: req.body.email});
        const resultCompare = bcrypt.compareSync(req.body.password, loginUserResult.password)
        res.status(200).json(resultCompare);
    } catch (e) {
        res.status(400).json({
            "message": e.message
        })
    }
}

export { registerUser, loginUser };