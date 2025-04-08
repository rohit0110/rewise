import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuCard({ to, title, subtitle, comingSoon = false, color = 'gray' }) {
  const baseClass =
    'p-6 rounded-2xl shadow-md text-left w-full transition-transform hover:scale-105';

  const colorClass = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-200 text-gray-700',
  }[color] || 'bg-gray-200 text-gray-700';

  const content = (
    <div className={`${baseClass} ${colorClass}`}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{subtitle}</p>
    </div>
  );

  if (comingSoon) {
    return <div className="opacity-60 cursor-not-allowed">{content}</div>;
  }

  return <Link to={to}>{content}</Link>;
}
