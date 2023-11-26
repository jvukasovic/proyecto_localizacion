import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName:   { type: String, unique: [true, 'This user name has already been used.'], required: [true, 'Name is required.'] },
    email:      { type: String, unique: [true, 'This email has already been used.'], required: [true, 'Email is required.'] }, 
    password:   { type: String, required: [true, 'Password is required.'],  minLength: [6, "Password must be longer than 6 characters."] },
    type:       { type: String, enum: ['admin', 'read'] }
},
{
    timestamps: true 
});

const User = mongoose.model('user', UserSchema); //NOMBRE COLECCION
export default User;