'use client';

import { useEffect, useState } from 'react';
import AgentCard from './components/AgentCard';
import TaskBoard from './components/TaskBoard';
import AddTaskForm from './components/AddTaskForm';
import AgentChatPanel from './components/AgentChatPanel';
import { Agent, Task } from '@/types';

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    const [agentsRes, tasksRes] = await Promise.all([
      fetch('/api/agents'),
      fetch('/api/tasks'),
    ]);
    const agentsData = await agentsRes.json();
    const tasksData = await tasksRes.json();
    setAgents(agentsData);
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center text-gray-900">AI Agent Dashboard</h1>

        {/* AGENTS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="space-y-4 w-full">
              <AgentCard
                name={agent.name}
                status={agent.status}
                taskCount={agent.tasks.length}
              />
              <AgentChatPanel agent={agent} />
            </div>
          ))}
        </section>

        <section className="w-full max-w-2xl mx-auto">
          <AddTaskForm agents={agents} onTaskAdded={fetchData} />
        </section>

        <section className="w-full">
          <TaskBoard agents={agents} tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
