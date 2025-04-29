import { Router } from "express";
import chatRoutes from "./chatRoutes";

const router = Router();

router.use("/api", chatRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default router;
