'use client'

import { useEffect, useState } from 'react'
import { Agent } from '@/types'

type Message = {
  sender: string
  text: string
}

type Props = {
  agent: Agent
}

export default function AgentChatPanel ({ agent }: Props) {
  const storageKey = `agent-chat-${agent.id}`
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      setMessages(JSON.parse(stored))
    }
  }, [storageKey])

  // Save to localStorage on message update
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages))
  }, [messages, storageKey])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentName: agent.name, message: input })
      })

      const data = await res.json()
      const reply = {
        sender: agent.name,
        text: data.reply
      }

      setMessages(prev => [...prev, reply])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: agent.name, text: '⚠️ Failed to respond. Try again later.' }
      ])
    }

    setLoading(false)
  }

  const handleClear = () => {
    localStorage.removeItem(storageKey)
    setMessages([])
  }

  return (
    <div className='bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-lg p-5 space-y-4 w-full'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>
          {agent.name} - Chat
        </h2>
        <button
          onClick={handleClear}
          className='text-sm text-red-500 hover:underline'
        >
          Clear
        </button>
      </div>

      <div className='h-48 overflow-y-auto bg-gray-100 rounded-lg p-3 space-y-2 text-sm'>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-blue-100 ml-auto text-right'
                : 'bg-gray-200'
            }`}
          >
            <div>{msg.text}</div>
            <div className='text-xs text-gray-500 mt-1'>
              {msg.sender === 'user' ? 'You' : msg.sender}
            </div>
          </div>
        ))}
        {loading && (
          <div className='text-xs italic text-gray-500'>Thinking...</div>
        )}
      </div>

      <div className='flex flex-col sm:flex-row gap-2'>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Send a command...'
          className='flex-1 px-3 py-2 border rounded-lg'
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className='px-4 py-2 rounded-lg disabled:opacity-50'
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
