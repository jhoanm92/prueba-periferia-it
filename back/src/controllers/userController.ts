import { Request, Response } from 'express';
import userService from '../services/userService';

const getProfile = async (req: Request, res: Response) => {
  try {
    console.log("profile")
    console.log(req.user);
    const profile = await userService.getProfile((req.user as any).id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};

export default { getProfile };
