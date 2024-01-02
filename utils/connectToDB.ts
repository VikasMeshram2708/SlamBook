import { Request, Response } from "express";
import prisma from "../prisma";

export const connectToDb = async () => {
  try {
    await prisma.$connect();
    console.log(`Connected to DB Successfully`);
  } catch (error) {
    const errorMessage = error as Error;
    console.log(`Error Connecting to DB : ${errorMessage.message}`)
  }
};
