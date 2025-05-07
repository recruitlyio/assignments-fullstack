import { Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/request-validator";
import { ObjectId } from "../../types/mongoose";
import { candidateValidation } from "../../validations/candidate/create";
import { Request, Response } from "express";
import { Candidate } from "../../models/candidate/candidate";

const route = Router();

route.post(
  "/create",
  validateRequest(candidateValidation, undefined, undefined),
  async (req: Request, res: Response) => {
    try {
      const data = await Candidate.create(req.body);
      res.status(200).json({ message: "Success", data });
    } catch (error) {
      throw new BadRequestError("Cound not create Candidate.");
    }
  }
);
export { route as createCandidateRouter };
