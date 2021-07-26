import { Response } from "express";
import { RequestProps } from '../types/RequestProps';
import * as yup from 'yup';
import { User as UserModel } from '../models/User';
import { HandleError } from '../errors/HandleError';

export class TokenController{
  async create(request: RequestProps, response: Response){
    const { email, password } = request.body;

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }

    const userModel = new UserModel({name: '', email, password});

    const token = await userModel.auth()
    if(userModel.errors.length > 0){
      return response.status(400).json(HandleError(userModel.errors))
    }

    return response.json({ status: 'Authenticated!', token });
  }
}
