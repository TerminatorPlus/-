
import { PurchaseItem, WeeklyBudget } from '../types';

export const calculateWeeklyStatus = (totalBudget: number, items: PurchaseItem[]): WeeklyBudget[] => {
  const weeks: WeeklyBudget[] = [];
  const weeklyAllocation = totalBudget / 12;

  for (let i = 1; i <= 12; i++) {
    weeks.push({
      weekNumber: i,
      totalAllocated: weeklyAllocation,
      spent: 0,
      remaining: weeklyAllocation,
    });
  }

  items.forEach((item) => {
    const purchaseDate = new Date(item.purchaseDate);
    const startWeek = 1; // Simplification: we calculate relative to a cycle start or current date
    // In a real app, we'd map purchaseDate to a specific week index.
    // For this dashboard, we assume items apply to the upcoming weeks based on their duration.
    
    const numWeeksCovered = Math.ceil(item.durationDays / 7);
    const costPerWeek = item.price / numWeeksCovered;

    for (let w = 0; w < numWeeksCovered && w < 12; w++) {
      weeks[w].spent += costPerWeek;
      weeks[w].remaining -= costPerWeek;
    }
  });

  return weeks;
};

export const getDaysRemaining = (purchaseDate: string, durationDays: number): number => {
  const start = new Date(purchaseDate);
  const end = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getAlertStatus = (daysRemaining: number) => {
  if (daysRemaining <= 0) return { color: 'text-red-600', label: 'انتهت المدة', bg: 'bg-red-50' };
  if (daysRemaining <= 3) return { color: 'text-orange-600', label: 'قارب على الانتهاء', bg: 'bg-orange-50' };
  return { color: 'text-green-600', label: 'متوفر', bg: 'bg-green-50' };
};
