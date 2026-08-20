import { Transaction, TransactionType, Category } from './models';

export interface CreateTransactionRequest {
  accountId: string;
  toAccountId?: string; // Wajib jika type === 'TRANSFER'
  type: TransactionType;
  amount: number;
  currency: string;
  exchangeRateUsed?: number; // Digunakan jika transfer beda currency
  categoryId?: string;
  description?: string;
  occurredAt: string;
}

export interface GetTransactionsResponse {
  items: Transaction[];
  total: number;
}

export interface GetCategoriesResponse {
  items: Category[];
}