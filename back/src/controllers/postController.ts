import { Request, Response } from 'express';
import postService from '../services/postService';

const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = await postService.createPost(userId, title, content);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


const likePost = async (req: Request, res: Response) => {
  try {
    await postService.likePost((req.user as any).id, parseInt(req.params.id));
    res.json({ message: 'Post liked' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export default { getAllPosts, createPost, likePost };
