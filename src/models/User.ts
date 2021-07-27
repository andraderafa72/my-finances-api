/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { model, Schema } from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserProps {
  name: string;
  email: string;
  password: string;
  transactions?: string[];
}

const schema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  transactions: Array,
  createdAt: { type: Date, required: true, default: new Date() },
});

export const UserModel = model<UserProps>('User', schema);

export class User {
  constructor(
    public user: UserProps,
    public errors: string[] = [],
  ) {}

  async createUser(): Promise<void> {
    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(this.user.password, salt);
    this.user.password = password;

    await UserModel.create(this.user);
  }

  async userExists(): Promise<void> {
    const exists = await UserModel.findOne({ email: this.user.email });
    if (exists) this.errors.push('User already exists!');
  }

  async auth(): Promise<string> {
    const user = await UserModel.findOne({ email: this.user.email });
    if (!user) {
      this.errors.push('Invalid user!');
      return 'no-auth';
    }

    const isThePasswordValid = bcryptjs.compareSync(this.user.password, user.password);
    if (!isThePasswordValid) {
      this.errors.push('Invalid Password!');
      return 'no-auth';
    }

    const token = jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    );

    return token;
  }
}
