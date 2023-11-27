import Boulder from "../models/boulder.model.js";

const createBoulder = async (req, res) => {
    try {
        // validar si usuario es admin?
        // validar que los grados sean correctos
        const createData = req.body;
        const newBoulderData = await Review.create(createData);
        res.status(200).json(newBoulderData);
    } catch(e) {
        res.status(400).json({"message": e.message});
    }
}

const getBoulders = async (req, res) => {
    try {
        const boulderList = await Boulder.find();
        res.status(200).json(boulderList);
    } catch (e) {
        res.status(400).json({"message": e.message});
    }
}

const getOneBoulder = async (req, res) => {
    try {
        const idBoulder = req.params.idBoulder;
        const boulderFound = await Boulder.findById(idBoulder);
        res.json(boulderFound);
    } catch (e) {
        res.status(400).json({"message": e.message});
    }
}

const deleteBoulder = async (req, res) => {
    try {
        const id = req.params.idBoulder;
        await Boulder.findByIdAndDelete(id);
        res.status(200).json();
    } catch (e) {
        res.status(400).json({"message": e.message});
    }
}

const updateBoulder = async (req, res) => {
    try{
        // validar si usuario es admin?
        // validar que los grados sean correctos
        const id = req.params.idBoulder;
        const editBoulderData = req.body;
        await Boulder.findByIdAndUpdate(id, editBoulderData, {runValidators: true});
        res.status(200).json();
    }catch(e){
        res.status(400).json({
            "message": e.message
        })
    }
}

export { createBoulder, getBoulders, getOneBoulder, deleteBoulder, updateBoulder }