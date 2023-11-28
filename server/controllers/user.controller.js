import User from "../models/user.model.js";

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
        const loginUserResult = await User.findOne({email: req.body.email, password: req.body.password});
        if(loginUserResult != null){
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (e) {
        res.status(400).json({
            "message": e.message
        })
    }
}

export { registerUser, loginUser };