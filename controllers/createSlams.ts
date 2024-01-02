import { Request, Response } from "express";
import prisma from "../prisma";
import { connectToDb } from "../utils/connectToDB";

export const createNewSlam = async (req: Request, res: Response) => {
  try {
    await connectToDb();

    const { title, slug, content, author, authorId } = req.body;

    if (!title || !slug || !content || !author) {
      return res.json({
        message: "Those are the required fields.",
      });
    }

    // check the slug should be unique
    const slugExist = await prisma.slams.findUnique({
      where: {
        slug: slug,
      },
    });

    if (slugExist) {
      return res.json({
        message: "The Slug is already in use please provide unique slug.",
      });
    }

    // insert into DB
    const slamItem = await prisma.slams.create({
      data: {
        title,
        slug,
        content,
        author: {
          connect: {
            id: "6594144ba462e244321782e3",
          },
        },
        created_on: new Date().toLocaleString()
      },
    });

    res.status(200).json({
      message: "Your Slam Was Successfully Created",
      data: slamItem,
    });
  } catch (error) {
    const errorMessage = error as Error;
    return res.status(500).json({
      message: `Error While Creating new Slams ; ${errorMessage.message}`,
    });
  }
};
