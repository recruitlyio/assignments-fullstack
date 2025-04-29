import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const listInterviews = async () => {
    try {
        const interviews = await prisma.interview.findMany();
        return interviews;
    } catch (error) {
        console.error("Error listing interviews:", error);
        throw error;
    }
}

export const createNewInterview = async (body: any) => {
    try {
        console.log(body);
        const newInterview = await prisma.interview.create({
            data: body,
        })
        return newInterview;
    } catch (error) {
        throw error;
    }
}