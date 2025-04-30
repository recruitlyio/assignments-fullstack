import { NextFunction, Request, Response } from "express";
import { createNewInterview, listInterviews } from "../services/interview.service";

export const getAllInterviews = async(_: Request, res: Response, next: NextFunction) => {
    try {
        const interviews = await listInterviews();
        if(interviews === null || interviews.length === 0) {
            res.status(404).json({message: "No interviews found"});
        } 
        res.status(200).json({interviews});
    } catch (error) {
        next(error);
    }
}

export const createInterview = async(req: any, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const newinterview = await createNewInterview(body);
        if(newinterview === null) {
            res.status(404).json({message: "Interview not created"});
        }
        res.status(200).json({newinterview});
    } catch (error) {
        next(error);
    }
}