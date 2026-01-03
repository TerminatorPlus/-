
export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  purchaseDate: string; // ISO string
}

export interface WeeklyBudget {
  weekNumber: number;
  totalAllocated: number;
  spent: number;
  remaining: number;
}

export interface AppState {
  totalBudget3Months: number;
  items: PurchaseItem[];
}
