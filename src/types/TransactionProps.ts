export interface TransactionProps {
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  category: string;
  user: string;
}
