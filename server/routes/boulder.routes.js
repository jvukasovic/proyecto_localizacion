import express from 'express';
import * as bulderCtrl from '../controllers/boulders.controller.js';

const router = express.Router();
router.post("/api/boulders/create", bulderCtrl.createBoulder);
router.get("/api/boulders/get", bulderCtrl.getBoulders);
router.get("/api/boulders/getOne/:idBoulder", bulderCtrl.getOneBoulder);
router.delete("/api/boulders/delete/:idBoulder", bulderCtrl.deleteBoulder);
router.put("/api/boulders/update/:idBoulder", bulderCtrl.updateBoulder);

export {router}