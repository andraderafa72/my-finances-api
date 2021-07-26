import { Request } from 'express';

type User = {
  id: string;
  name: string;
  email: string;
}

export type RequestProps = Request & {
  user: User
}
