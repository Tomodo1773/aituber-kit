import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.JWT_TOKEN;
  const websocketUrl = process.env.EXTERNAL_LINKAGE_URL || 'ws://localhost:8000/ws';

  if (!token) {
    return res.status(500).json({ error: 'JWT token is not defined. Please check server environment variables.' });
  }

  res.status(200).json({ token, websocketUrl });
}
