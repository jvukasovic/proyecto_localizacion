import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    subject: { 
        type: String, 
        required: [true, 'Asunto es requerido.'],
        minLength: [5, 'El asunto debe tener más de 5 caracteres.'] 
    },
    content: { 
        type: String, 
        required: [true, 'Contenido es requerido.'],  
        minLength: [10, 'El contenido debe tener más de 10 caracteres.']  
    }, 
    contact: { 
        type: String, 
        required: [true, 'Contacto es requerido.'] ,
        minLength: [5, 'El contacto debe tener más de 5 caracteres.'] 
    },
    idUser: { 
        type: mongoose.Types.ObjectId, 
        required: [true, 'Id User es requerido.']
    }
},
{
    timestamps: true 
});

const Message = mongoose.model('message', MessageSchema); 
export default Message;