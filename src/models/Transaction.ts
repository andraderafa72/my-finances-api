/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { TransactionProps } from '../types/TransactionProps';

const schema = new Schema<TransactionProps>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
});

const TransactionModel = model<TransactionProps>('Transaction', schema);

export class Transaction {
  constructor(
    public transaction: TransactionProps,
    public errors: string[] = [],
  ) {}

  async createTransaction(): Promise<void> {
    await TransactionModel.create(this.transaction);
  }

  static async deleteTransaction(transactionId: string): Promise<void> {
    await TransactionModel.findOneAndDelete({ _id: transactionId });
  }

  static async updateTransaction(transactionId: string, transactionData: TransactionProps) {
    await TransactionModel.findOneAndUpdate({ _id: transactionId }, transactionData);
  }

  static async getWithdrawTransactions(
    userId,
    limit = 25,
    id?: string,
  ): Promise<TransactionProps[] | TransactionProps> {
    if (id) {
      const transaction: TransactionProps = await TransactionModel.findOne({
        where: {
          _id: new ObjectId(id),
          user: userId,
          type: 'withdraw',
        },

      }).limit(limit);
      return transaction;
    }

    const transactions: TransactionProps[] = await TransactionModel.find({
      where: {
        user: userId,
        type: 'withdraw',
      },

    }).limit(limit);
    return transactions;
  }

  static async getDepositTransactions(
    userId,
    limit = 25,
    id?: string,
  ): Promise<TransactionProps[] | TransactionProps> {
    if (id) {
      const transaction: TransactionProps = await TransactionModel.findOne({
        _id: new ObjectId(id),
        user: userId,
        type: 'deposit',
      }).limit(limit);

      return transaction;
    }

    const transactions: TransactionProps[] = await TransactionModel.find({
      user: userId,
      type: 'deposit',
    }).limit(limit);
    return transactions;
  }

  static async getAllTransactions(
    userId,
    limit = 25,
    id?: string,
  ): Promise<TransactionProps[] | TransactionProps> {
    if (id) {
      const transaction: TransactionProps = await TransactionModel.findOne({
        _id: new ObjectId(id),
        user: userId,
      }).limit(limit);
      return transaction;
    }

    const transactions: TransactionProps[] = await TransactionModel.find({
      user: userId,
    }).limit(limit);
    return transactions;
  }
}
