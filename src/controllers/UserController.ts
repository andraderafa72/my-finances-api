import { Response } from "express";
import { RequestProps } from '../types/RequestProps';
import * as yup from 'yup';
import { User as UserModel } from '../models/User';
import { HandleError } from '../errors/HandleError';

export class UserController{
  async create(request: RequestProps, response: Response){
    const { name, email, password } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }

    const userModel = new UserModel({name, email, password});

    await userModel.createUser()
    if(userModel.errors.length > 0){
      return response.status(400).json(HandleError(userModel.errors))
    }

    return response.json({ status: 'Created Successfully!', user: userModel.user });
  }
}
