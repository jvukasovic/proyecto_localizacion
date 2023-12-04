import mongoose from "mongoose";

const BoulderSchema = new mongoose.Schema({
    boulderName: { 
        type: String, 
        unique: [true, 'El nombre de este boulder ya existe.'], 
        required: [true, 'El nombre del boulder es requerido.'] 
    },
    grade: { 
        type: String, 
        // enum: ['V0', 'V1', 'V2'],  // vale la pena hacerlo aqui, o se puede hacer una funcion validGrade cuando se cree y eso es suficiente? 
        required: [true, 'El grado es requerido.'] 
    }, 
    description: { 
        type: String, 
        required: [true, 'La descripcion es requerida.'],  
        minLength: [10, 'La descripición debe tener más de 10 caracteres.'] 
    },
    geolocation: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
    },
    meanRating:{
        type: Number,
        min: 0,
        max: 5,
        required: [true, 'La calificación es requerida']
    },
    calification: [{
        rating : { 
            type: Number, 
            min: 0,
            max: 5,
            required: [true, 'La calificación es requerida']
        }, 
        comment: { 
            type: String, 
            // minLength: 10
        },
        idUser: { 
            type: mongoose.Types.ObjectId,
            // required: [true, 'Id User es requerido']
        }
    }
    ], 
    idUser: { 
        type: mongoose.Types.ObjectId,
        // required: [true, 'Id User es requerido']
    }
},
{
    timestamps: true 
});

const Boulder = mongoose.model('boulder', BoulderSchema); 
export default Boulder;

  
