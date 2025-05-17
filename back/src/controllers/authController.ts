import { Request, Response } from 'express';
import authService from '../services/authService';

const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};

export default { login };
