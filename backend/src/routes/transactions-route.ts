import express from "express";
import * as Controller from "../controller/transctions-controller";

const router = express.Router();

router.get("/health", (req, res) => {
  res.send("It's ok");
});

router.get("/:userId", Controller.getTransactionsByUserIdController);

router.post("/", Controller.mutateTransactionController);

router.delete("/:id", Controller.deleteTransactionByIdController);

router.get(
  "/summary/:userId",
  Controller.getTransactionsSummaryByuserIdController
);

export default router;
