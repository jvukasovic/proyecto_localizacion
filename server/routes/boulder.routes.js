import express from 'express';
import * as bulderCtlr from '../controllers/boulders.controller.js';

const router = express.Router();
router.post("/api/boulders/create", bulderCtlr.createBoulder);
router.get("/api/boulders/get", bulderCtlr.getBoulders);
router.get("/api/boulders/getOne/:idBoulder", bulderCtlr.getOneBoulder);
router.delete("/api/boulders/delete/:idBoulder", bulderCtlr.deleteBoulder);
router.put("/api/boulders/update/:idBoulder", bulderCtlr.updateBoulder);

export {router}