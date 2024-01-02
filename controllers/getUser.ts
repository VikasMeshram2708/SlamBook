import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "This is users API.",
  });
};


export default getUsers;