import { Response } from "express";
import * as yup from 'yup';
import { RequestProps } from '../types/RequestProps';
import { Transaction as TransactionModel } from '../models/Transaction';
import { HandleError } from '../errors/HandleError';

export class TransactionController {
  async createDeposit(request: RequestProps, response: Response) {
    const { title, amount, category } = request.body;
    const userId = request.user?.id;

    const schema = yup.object().shape({
      title: yup.string().required(),
      amount: yup.number().required(),
      category: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }

    const transactionModel = new TransactionModel({
      title,
      amount,
      type: 'deposit',
      category,
      user: userId,
    });

    await transactionModel.createTransaction();
    if (transactionModel.errors.length > 0) {
      return response.status(400).json(HandleError(transactionModel.errors));
    }

    return response.json({ status: 'Authenticated!', transaction: transactionModel.transaction });
  }

  async createWithdraw(request: RequestProps, response: Response) {
    const userId = request.user?.id;
    const { title, amount, category } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      amount: yup.number().required(),
      category: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }

    const transactionModel = new TransactionModel({
      title,
      amount,
      type: 'withdraw',
      category,
      user: userId,
    });

    await transactionModel.createTransaction();
    if (transactionModel.errors.length > 0) {
      return response.status(400).json(HandleError(transactionModel.errors));
    }

    return response.json({ status: 'Created!', transaction: transactionModel.transaction });
  }

  async getWithdraws(request: RequestProps, response: Response) {
    const userId = request.user.id;

    const transactions = await TransactionModel.getWithdrawTransactions(userId);
    return response.json({ transactions });
  }

  async getDeposits(request: RequestProps, response: Response) {
    const userId = request.user.id;

    const transactions = await TransactionModel.getDepositTransactions(userId);
    return response.json({ transactions });
  }
}
