/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface TransactionProps {
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  user: string;
}

const schema = new Schema<TransactionProps>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  user: { type: String, required: true },
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
    await TransactionModel.findOneAndDelete({_id: transactionId});
  }

  static async updateTransaction(transactionId: string, transactionData: TransactionProps) {
    await TransactionModel.findOneAndUpdate({ _id: transactionId }, transactionData)
  }

  static async getWithdrawTransactions(user, limit = 25): Promise<TransactionProps[]> {
    const transactions: TransactionProps[] = await TransactionModel.find({ user, type: 'withdraw' });
    return transactions;
  }

  static async getDepositTransactions(user, limit = 25): Promise<TransactionProps[]> {
    const transactions: TransactionProps[] = await TransactionModel.find({ user });
    return transactions;
  }
}
