
import React, { useState, useEffect, useMemo } from 'react';
import PurchaseInput from './components/PurchaseInput';
import SummaryCards from './components/SummaryCards';
import WeeklyTable from './components/WeeklyTable';
import ItemsList from './components/ItemsList';
import { PurchaseItem } from './types';
import { calculateWeeklyStatus } from './utils/calculations';

const App: React.FC = () => {
  const [totalBudget3Months, setTotalBudget3Months] = useState<number>(() => {
    const saved = localStorage.getItem('totalBudget');
    return saved ? parseFloat(saved) : 10000;
  });

  const [items, setItems] = useState<PurchaseItem[]>(() => {
    const saved = localStorage.getItem('purchaseItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('totalBudget', totalBudget3Months.toString());
  }, [totalBudget3Months]);

  useEffect(() => {
    localStorage.setItem('purchaseItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: PurchaseItem) => {
    setItems((prev) => [...prev, item]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter(i => i.id !== id));
  };

  const weeklyData = useMemo(() => 
    calculateWeeklyStatus(totalBudget3Months, items), 
    [totalBudget3Months, items]
  );

  const totalSpent = useMemo(() => 
    items.reduce((sum, item) => sum + item.price, 0), 
    [items]
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-slate-800 text-white py-6 px-4 md:px-12 mb-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">مدير المشتريات والميزانية</h1>
              <p className="text-slate-400 text-sm">نظام إدارة الميزانية الدورية 12 أسبوع</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">التاريخ اليوم</div>
            <div className="text-lg font-semibold">{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-12">
        <SummaryCards 
          totalBudget={totalBudget3Months} 
          totalSpent={totalSpent} 
        />

        <PurchaseInput 
          onAdd={addItem} 
          onSetBudget={setTotalBudget3Months}
          currentTotalBudget={totalBudget3Months}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <WeeklyTable weeks={weeklyData} />
          <ItemsList items={items} onDelete={deleteItem} />
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        جميع المبالغ موضحة بالجنيه المصري (ج.م) &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
