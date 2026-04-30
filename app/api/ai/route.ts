import { NextResponse } from 'next/server';
import { generateAIResponse } from '../../../lib/aiService';

export async function POST(request: Request) {
  const body = await request.json();
  const tool = body.tool as string;
  const input = body.input as string;

  if (!tool || !input) {
    return NextResponse.json(
      { error: 'tool y input son obligatorios' },
      { status: 400 },
    );
  }

  try {
    const output = await generateAIResponse(tool, input);
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 },
    );
  }
}
