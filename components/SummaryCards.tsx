
import React from 'react';

interface SummaryCardsProps {
  totalBudget: number;
  totalSpent: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalBudget, totalSpent }) => {
  const remaining = totalBudget - totalSpent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-slate-500 text-sm mb-1">إجمالي ميزانية 3 أشهر</p>
        <h3 className="text-2xl font-bold text-blue-600">{totalBudget.toLocaleString()} ج.م</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-slate-500 text-sm mb-1">المصروف المقدر</p>
        <h3 className="text-2xl font-bold text-red-500">{totalSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })} ج.م</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-slate-500 text-sm mb-1">الرصيد المتبقي الإجمالي</p>
        <h3 className="text-2xl font-bold text-green-600">{remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })} ج.م</h3>
      </div>
    </div>
  );
};

export default SummaryCards;
