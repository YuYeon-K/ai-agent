import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { agentName, message } = await req.json();

  const systemPrompt = `You are ${agentName}, an AI assistant agent. Be helpful and concise.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    }),
  });

  const data = await res.json();

  const reply = data.choices?.[0]?.message?.content || 'Sorry, I had trouble responding.';
  return NextResponse.json({ reply });
}
