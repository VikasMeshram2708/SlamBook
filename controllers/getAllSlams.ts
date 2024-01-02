import { Request, Response } from "express";

import prisma from "../prisma";

import { connectToDb } from "../utils/connectToDB";

export const getAllSlams = async (req: Request, res: Response) => {
  try {
    await connectToDb();

    const slams = await prisma.slams.findMany({
      select: {
        id: true,
        title: true,
        authorId: true,
        content: true,
        created_on: true,
        slug: true,
      },
    });

    res.status(200).json({
      slams: slams.reverse(),
    });
  } catch (error) {
    const errrorMessage = error as Error;
    return res.status(500).json({
      message: `Error In Finding Users : ${errrorMessage.message}`,
    });
  }
};
