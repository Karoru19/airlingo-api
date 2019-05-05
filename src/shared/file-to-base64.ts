var fs = require('fs');

export function fileToBase64(filename: string): string {
  const bitmap = fs.readFileSync(filename);
  return new Buffer(bitmap).toString('base64');
}
