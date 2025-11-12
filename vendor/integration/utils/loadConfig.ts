import fs from 'node:fs';
import yaml from 'js-yaml';

const loadConfig = async (configPathOrData: string | object) => {
  if (typeof configPathOrData === 'string') {
    const content = fs.readFileSync(configPathOrData, 'utf8');
    if (configPathOrData.endsWith('.yaml') || configPathOrData.endsWith('.yml')) {
      // yaml.load() in js-yaml 4.x uses safe schema by default (no code execution)
      return yaml.load(content);
    }
    return content;
  }

  return configPathOrData;
};

export default loadConfig;
