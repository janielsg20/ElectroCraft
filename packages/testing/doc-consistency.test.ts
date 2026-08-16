import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Document Consistency', () => {
  it('TRACKING.md should have exactly one active microphase', () => {
    const trackingPath = path.resolve(__dirname, '../../.ai/TRACKING.md');
    const content = fs.readFileSync(trackingPath, 'utf8');

    const activeMatches = content.match(/Estado:\s*EN_CURSO/g);
    // Nota: M01.6 is currently EN_CURSO in my tracking update.
    expect(activeMatches?.length).toBe(1);
  });

  it('All required core documents should exist in .ai/', () => {
    const requiredFiles = [
      'RULES.md',
      'MEMORY.md',
      'STATE.md',
      'ARCHITECTURE.md',
      'DATA_MODELS.md',
      'REQUIREMENTS.md',
      'TRACKING.md'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.resolve(__dirname, '../../.ai/', file);
      expect(fs.existsSync(filePath), `Missing required file: ${file}`).toBe(true);
    });
  });
});
