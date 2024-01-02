import { Request, Response } from "express";

import prisma from "../prisma";

import { connectToDb } from "../utils/connectToDB";

export const getALlUsers = async (req: Request, res: Response) => {
  try {
    await connectToDb();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        created_on: true,
      },
    });

    res.status(200).json({
      users: users.reverse(),
    });
  } catch (error) {
    const errrorMessage = error as Error;
    return res.status(500).json({
      message: `Error In Finding Users : ${errrorMessage.message}`,
    });
  }
};
