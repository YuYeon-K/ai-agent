import { NextRequest, NextResponse } from 'next/server';

let tasks = [
  {
    id: 'T1',
    title: 'Research market data',
    status: 'todo',
    assignedTo: '1',
  },
  {
    id: 'T2',
    title: 'Update pricing model',
    status: 'in-progress',
    assignedTo: '1',
  },
  {
    id: 'T3',
    title: 'Summarize competitor analysis',
    status: 'done',
    assignedTo: '2',
  },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newTask = {
    id: `T${tasks.length + 1}`,
    title: body.title,
    status: 'todo',
    assignedTo: body.assignedTo,
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
