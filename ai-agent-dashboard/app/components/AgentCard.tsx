'use client';
import React from 'react';

type Props = {
  name: string;
  status: string;
  taskCount: number;
};

export default function AgentCard({ name, status, taskCount }: Props) {
    const statusColor =
      status === 'online' ? 'text-green-600' :
      status === 'busy' ? 'text-yellow-500' :
      'text-red-500';
  
    return (
      <div className="bg-white/70 backdrop-blur shadow-xl rounded-2xl p-5 border border-gray-200 hover:shadow-2xl transition">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{name}</h2>
            <p className={`text-sm font-medium ${statusColor}`}>{status}</p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {taskCount} tasks
          </span>
        </div>
      </div>
    );
  }
  