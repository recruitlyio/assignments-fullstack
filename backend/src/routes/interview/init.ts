import { Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/request-validator";
import { Request, Response } from "express";
import { Candidate } from "../../models/candidate/candidate";
import { initInterviewValidation } from "../../validations/interview/init";
import { Interview } from "../../models/interview/interview";
import { ObjectId } from "../../types/mongoose";

const route = Router();

route.post(
  "/init",
  validateRequest(undefined, initInterviewValidation, undefined),
  async (req: Request, res: Response) => {
    try {
      const candidate = await Candidate.findById(req.query.candidateId);
      if (!candidate) {
        throw new BadRequestError("Candidate not found.");
      }
      const interview = await Interview.create({
        candidateId: new ObjectId(req.query.candidateId as string),
      });
      const data = {
        interview,
        candidate,
      };
      res.status(200).json({ message: "Success", data });
    } catch (error) {
      throw new BadRequestError("Cound not Initialize Interview.");
    }
  }
);
export { route as createCandidateRouter };
