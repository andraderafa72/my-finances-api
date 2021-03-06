import { Response } from "express";
import * as yup from 'yup';
import { RequestProps } from '../types/RequestProps';
import { Transaction as TransactionModel } from '../models/Transaction';
import { HandleError } from '../errors/HandleError';
import { TransactionProps } from "../types/TransactionProps";
import { UserModel } from "../models/User";

export class TransactionController {
  async createTransaction(request: RequestProps, response: Response) {
    const {
      title, amount, category, type,
    } = request.body;
    const userId = request.user?.id;

    const schema = yup.object().shape({
      title: yup.string().required(),
      amount: yup.number().required(),
      category: yup.string().required(),
      type: yup.string().required(),
    });
    if (type !== 'deposit' && type !== 'withdraw') {
      return response.status(400).json(HandleError('Invalid body!'));
    }
    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }

    const transactionModel = new TransactionModel({
      title,
      amount,
      type,
      category,
      user: userId,
    });

    const createdTransaction = await transactionModel.createTransaction();
    if (transactionModel.errors.length > 0) {
      return response.status(400).json(HandleError(transactionModel.errors));
    }

    return response.json({ status: 'Created Successfully!', transaction: createdTransaction });
  }

  async getWithdraws(request: RequestProps, response: Response) {
    const userId = request.user.id;
    const { id } = request.params;

    if (id) {
      const transaction = await TransactionModel.getWithdrawTransactions(userId, 1, id);
      return response.json({ transaction });
    }

    const transactions = await TransactionModel.getWithdrawTransactions(userId);
    return response.json({ transactions });
  }

  async getDeposits(request: RequestProps, response: Response) {
    const userId = request.user.id;
    const { id } = request.params;

    if (id) {
      const transaction = await TransactionModel.getDepositTransactions(userId, 1, id);
      return response.json({ transaction });
    }

    const transactions = await TransactionModel.getDepositTransactions(userId);
    return response.json({ transactions });
  }

  async getTransactions(request: RequestProps, response: Response) {
    const userId = request.user.id;

    const { id } = request.params;

    if (id) {
      const transaction = await TransactionModel.getAllTransactions(userId, 1, id);
      return response.json({ transaction });
    }

    const transactions = await TransactionModel.getAllTransactions(userId, 25);
    return response.json({ transactions });
  }

  async deleteTransaction(request: RequestProps, response: Response) {
    const { id } = request.params;
    try {
      const user = await UserModel.findOne({ email: request.user.email });

      user.transactions.splice(user.transactions.indexOf(id), 1);

      user.save((e) => console.log(e || ''));
      await TransactionModel.deleteTransaction(id);
      return response.json({ status: 'Deleted Successfully!' });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }
  }

  async updateTransaction(request: RequestProps, response: Response) {
    const {
      title, amount, category, type,
    }: TransactionProps = request.body;
    const { id } = request.params;
    const userId = request.user?.id;

    if (!title && !amount && !category && !type) {
      return response.status(400).json(HandleError('Invalid body!', 400));
    }

    const schema = yup.object().shape({
      title: yup.string(),
      amount: yup.number(),
      category: yup.string(),
      type: yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(HandleError(error.errors));
    }

    await TransactionModel.updateTransaction(id, {
      title, amount, category, type, user: userId,
    });

    return response.json({ status: 'Updated Successfully!' });
  }
}
