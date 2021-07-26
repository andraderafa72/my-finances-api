import { connect } from "mongoose";

export default async (): Promise<void> => {
  try {
    await connect(process.env.DATABASE_URL, { useUnifiedTopology: true });
  } catch (error) {
    throw new Error(error);
  }
};
