import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { RequestProps } from "../types/RequestProps";
import { HandleError } from '../errors/HandleError';
import { UserModel } from '../models/User';

export default async (
  request: RequestProps,
  response: Response,
  next: NextFunction,
): Promise<any> => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json(HandleError('Login required!'));
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    return response.status(401).json(HandleError('Login required!'));
  }

  try {
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId, userName, userEmail } = data;

    const userExists = await UserModel.findOne({ email: userEmail });

    if (!userExists) {
      return response.status(401).json(HandleError('Login required!'));
    }

    const user = { id: userId, name: userName, email: userEmail };
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json(HandleError('Invalid Token'));
  }
};
