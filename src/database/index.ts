import mongoose from "mongoose";

export default async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
  } catch (error) {
    throw new Error(error);
  }
};
