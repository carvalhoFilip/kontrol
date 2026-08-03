import { promises as fs } from 'fs';
import path from 'path';

export type SubscriberSource = 'icarus' | 'tc12';

export type Subscriber = {
  email: string;
  source: SubscriberSource;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), '.data');
const FILE_PATH = path.join(DATA_DIR, 'subscribers.json');

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, '[]', 'utf8');
  }
}

async function readAll(): Promise<Subscriber[]> {
  await ensureFile();
  const raw = await fs.readFile(FILE_PATH, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function upsertSubscriber(
  email: string,
  source: SubscriberSource
): Promise<{ created: boolean }> {
  const normalized = email.trim().toLowerCase();
  const all = await readAll();
  const exists = all.some((s) => s.email === normalized && s.source === source);
  if (exists) return { created: false };

  all.push({
    email: normalized,
    source,
    createdAt: new Date().toISOString(),
  });
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), 'utf8');
  return { created: true };
}
