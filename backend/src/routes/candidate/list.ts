import { Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { Request, Response } from "express";
import { Candidate } from "../../models/candidate/candidate";

const route = Router();

route.get(
  "/list",

  async (req: Request, res: Response) => {
    try {
      const data = await Candidate.find();
      res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      throw new BadRequestError("Cound not fetch Candidate.");
    }
  }
);
export { route as listCandidateRouter };
