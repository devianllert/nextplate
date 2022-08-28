import crypto from 'crypto';

export const hashSha256 = (content: string) => crypto.createHash('sha256').update(content).digest('base64');
