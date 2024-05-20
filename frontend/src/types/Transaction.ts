export interface Transaction {
    id: number;
    userId: number;
    date: string; 
    description: string;
    amount: number;
    type: string;
    category?: string;
  }
  