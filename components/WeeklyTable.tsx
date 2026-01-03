
import React from 'react';
import { WeeklyBudget } from '../types';

interface WeeklyTableProps {
  weeks: WeeklyBudget[];
}

const WeeklyTable: React.FC<WeeklyTableProps> = ({ weeks }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-bold text-slate-800">توزيع الميزانية الأسبوعي (12 أسبوع)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm">
              <th className="p-4 border-b">الأسبوع</th>
              <th className="p-4 border-b">المخصص (ج.م)</th>
              <th className="p-4 border-b">المصروف (ج.م)</th>
              <th className="p-4 border-b">المتبقي (ج.م)</th>
              <th className="p-4 border-b">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week) => (
              <tr key={week.weekNumber} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border-b font-medium">الأسبوع {week.weekNumber}</td>
                <td className="p-4 border-b">{week.totalAllocated.toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                <td className="p-4 border-b text-red-500">{week.spent.toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                <td className={`p-4 border-b font-bold ${week.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {week.remaining.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </td>
                <td className="p-4 border-b">
                   <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${week.remaining < 0 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(100, (week.spent / week.totalAllocated) * 100)}%` }}
                      ></div>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyTable;
