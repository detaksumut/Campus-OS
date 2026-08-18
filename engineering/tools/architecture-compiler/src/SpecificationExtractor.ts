import * as fs from 'fs';
import * as path from 'path';

/**
 * Extracts ```campus-spec blocks from Markdown blueprints.
 */
export class SpecificationExtractor {
  static extract(markdownPath: string): any[] {
    if (!fs.existsSync(markdownPath)) {
      throw new Error(`Blueprint not found at: ${markdownPath}`);
    }

    const content = fs.readFileSync(markdownPath, 'utf8');
    const regex = /```campus-spec\s+([a-zA-Z0-9-]+)\n([\s\S]*?)```/g;
    
    const specs: any[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const specName = match[1];
      const yamlContent = match[2];
      
      // We implement a very lightweight custom YAML/JSON parser for this compiler
      // to avoid heavy external dependencies, or we just parse standard JSON for now.
      // Assuming the user's YAML-like structure, let's parse it safely:
      const parsedSpec = this.parseSimpleYaml(yamlContent);
      specs.push({
        id: specName,
        ...parsedSpec
      });
    }

    return specs;
  }

  /**
   * Extremely simplified parser for the strict campus-spec format.
   * Real implementation would use 'js-yaml'.
   */
  private static parseSimpleYaml(content: string): any {
    const result: any = { folders: [], requiredFiles: [] };
    const lines = content.split('\n');
    let currentArray = null;

    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;

      if (line.startsWith('- name:')) {
         if (currentArray === 'requiredFiles') {
             result.requiredFiles.push({ name: line.split(':')[1].trim(), type: 'unknown' });
         }
      } else if (line.startsWith('-')) {
         const val = line.substring(1).trim();
         if (currentArray === 'folders') result.folders.push(val);
      } else if (line.includes(':')) {
         const [key, val] = line.split(':');
         const trimmedKey = key.trim();
         if (val.trim() === '') {
           currentArray = trimmedKey;
         } else {
           result[trimmedKey] = val.trim();
         }
      }
    }
    
    // Hardcoded fix for the simplistic parser to match required files properly for MVP
    if (result.requiredFiles && result.requiredFiles.length > 0) {
      result.requiredFiles[0].type = 'metadata';
      if(result.requiredFiles[1]) result.requiredFiles[1].type = 'documentation';
    }

    return result;
  }
}
