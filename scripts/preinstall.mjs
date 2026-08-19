import { unlink } from 'node:fs/promises';

for (const file of ['package-lock.json', 'yarn.lock']) {
  await unlink(file).catch(() => {});
}

if (!process.env.npm_config_user_agent?.startsWith('pnpm/')) {
  console.error('Use pnpm instead');
  process.exit(1);
}