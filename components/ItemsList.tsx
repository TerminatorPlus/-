
import React from 'react';
import { PurchaseItem } from '../types';
import { getDaysRemaining, getAlertStatus } from '../utils/calculations';

interface ItemsListProps {
  items: PurchaseItem[];
  onDelete: (id: string) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ items, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-bold text-slate-800">قائمة المشتريات والتنبيهات</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm">
              <th className="p-4 border-b">المنتج</th>
              <th className="p-4 border-b">السعر (ج.م)</th>
              <th className="p-4 border-b">دورية الشراء</th>
              <th className="p-4 border-b">أيام متبقية</th>
              <th className="p-4 border-b">الحالة</th>
              <th className="p-4 border-b">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 italic">لا توجد منتجات مضافة بعد.</td>
              </tr>
            ) : (
              items.map((item) => {
                const daysLeft = getDaysRemaining(item.purchaseDate, item.durationDays);
                const status = getAlertStatus(daysLeft);
                
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b font-medium">{item.name}</td>
                    <td className="p-4 border-b">{item.price.toLocaleString()} ج.م</td>
                    <td className="p-4 border-b">كل {item.durationDays} يوم</td>
                    <td className="p-4 border-b">{daysLeft} يوم</td>
                    <td className="p-4 border-b">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 border-b">
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="text-red-400 hover:text-red-600 p-1"
                        title="حذف"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsList;
