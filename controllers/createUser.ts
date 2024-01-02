import { Request, Response } from "express";

import prisma from "../prisma";

import bcrypt from "bcryptjs";

export const newUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      throw new Error("The Required Fields cannot be empty.");
    }

    // Check if Email is already in use
    const emailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const usernameExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (emailExist) {
      throw new Error("Email is already in use");
    }

    if (usernameExist) {
      throw new Error("Username is already in use");
    }

    // incrypt the password and insert into DB
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed-password", hashedPassword);

    // insert into DB

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        created_on: new Date().toLocaleString(),
      },
    });

    res.status(200).json({
      succes: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    const errrorMessage = error as Error;
    return res.status(500).json({
      message: `Error Creating New User : ${errrorMessage.message}`,
    });
  }
};
