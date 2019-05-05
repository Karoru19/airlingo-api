const uuid4 = require('uuid/v4');

export function generateToken(): string {
  return uuid4();
}
