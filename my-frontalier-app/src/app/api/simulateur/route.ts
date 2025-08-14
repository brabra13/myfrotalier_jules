import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'public');
  const fileContents = await fs.readFile(jsonDirectory + '/simulateur_tou_geneve_complete.json', 'utf8');
  return NextResponse.json(JSON.parse(fileContents));
}
