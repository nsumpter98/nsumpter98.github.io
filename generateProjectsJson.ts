// generateProjectsJson.ts
import { readdirSync, statSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectsDir = join(__dirname, 'public', 'projects');
const outputFile = join(__dirname, 'public', 'projects.json');

const projects = readdirSync(projectsDir)
  .filter(folder => statSync(join(projectsDir, folder)).isDirectory())
  .map(folder => {
    const images = readdirSync(join(projectsDir, folder)).filter(file => file.endsWith('.jpg') || file.endsWith('png'));
    const createdAt = statSync(join(projectsDir, folder)).ctime.toISOString();
    return { name: folder, images, createdAt };
  })
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

writeFileSync(outputFile, JSON.stringify(projects, null, 2));

console.log('✅ Projects JSON generated!');
