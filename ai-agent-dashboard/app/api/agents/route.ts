import { NextResponse } from 'next/server';

let agents = [
  { id: '1', name: 'Agent Alpha', status: 'online', tasks: ['T1', 'T2'] },
  { id: '2', name: 'Agent Beta', status: 'busy', tasks: ['T3'] },
];

export async function GET() {
  return NextResponse.json(agents);
}
