'use client'
import { useState } from 'react'
import { Agent } from '@/types'

type Props = {
  agents: Agent[]
  onTaskAdded: () => void
}

export default function AddTaskForm ({ agents, onTaskAdded }: Props) {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState(agents[0]?.id || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assignedTo })
    })

    if (res.ok) {
      setTitle('')
      onTaskAdded()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white/80 backdrop-blur p-6 rounded-xl shadow-md space-y-4 border border-gray-200 max-w-xl mx-auto'
    >
      <h2 className='text-xl font-semibold text-gray-800'>Add New Task</h2>

      <div>
        <label className='block text-sm mb-1'>Task Title</label>
        <input
          type='text'
          className='w-full p-2'
          placeholder='Enter a task...'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className='block text-sm mb-1'>Assign To</label>
        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          className='w-full p-2'
        >
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <button type='submit' className='w-full py-2 font-semibold rounded-lg'>
        Add Task
      </button>
    </form>
  )
}
