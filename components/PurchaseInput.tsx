
import React, { useState } from 'react';
import { PurchaseItem } from '../types';

interface PurchaseInputProps {
  onAdd: (item: PurchaseItem) => void;
  onSetBudget: (amount: number) => void;
  currentTotalBudget: number;
}

const PurchaseInput: React.FC<PurchaseInputProps> = ({ onAdd, onSetBudget, currentTotalBudget }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [days, setDays] = useState('');
  const [budgetInput, setBudgetInput] = useState(currentTotalBudget.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !days) return;

    const newItem: PurchaseItem = {
      id: crypto.randomUUID(),
      name,
      price: parseFloat(price),
      durationDays: parseInt(days),
      purchaseDate: new Date().toISOString(),
    };

    onAdd(newItem);
    setName('');
    setPrice('');
    setDays('');
  };

  const handleUpdateBudget = () => {
    onSetBudget(parseFloat(budgetInput) || 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Budget Setup */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">إعداد ميزانية الـ 3 أشهر</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-500 mb-1">المبلغ الإجمالي (ج.م)</label>
            <input 
              type="number" 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              placeholder="مثال: 12000"
            />
          </div>
          <button 
            onClick={handleUpdateBudget}
            className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            تحديث الميزانية
          </button>
        </div>
      </div>

      {/* Add Item Form */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">إضافة منتج دوري جديد</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm text-slate-500 mb-1">اسم المنتج</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="خبز، حليب، إلخ"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">السعر (ج.م)</label>
            <input 
              type="number" 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">الدورية (أيام)</label>
            <input 
              type="number" 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="7 أو 30 أو 90"
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            إضافة للمشتريات
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseInput;
