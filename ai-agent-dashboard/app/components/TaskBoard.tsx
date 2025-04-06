'use client';
import React from 'react';
import { Task, Agent } from '../../types';

type Props = {
  tasks: Task[];
  agents: Agent[];
};

const statusColumns = ['todo', 'in-progress', 'done'] as const;

const TaskBoard = ({ tasks, agents }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {statusColumns.map((status) => (
    <div key={status} className="bg-white/70 backdrop-blur p-5 rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 capitalize">{status.replace('-', ' ')}</h2>
      <div className="space-y-4">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => {
            const agent = agents.find((a) => a.id === task.assignedTo);
            return (
              <div key={task.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  {agent ? `Assigned to: ${agent.name}` : 'Unassigned'}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  ))}
</div>

  );
};

export default TaskBoard;
