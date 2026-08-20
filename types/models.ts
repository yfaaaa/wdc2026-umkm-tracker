export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';

export interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface Transaction {
  id: string;
  accountId: string;
  toAccountId?: string;
  type: TransactionType;
  amount: number | string;
  currency: string;
  exchangeRateUsed?: number | string;
  categoryId?: string;
  description?: string;
  occurredAt: string;
  createdAt: string;
  account?: { name: string };
  toAccount?: { name: string };
  category?: { name: string };
}