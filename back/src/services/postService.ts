import { Post, Like, User } from '../models';

const getAllPosts = async () => {
  return Post.findAll({ 
    include: [
      { model: User, attributes: ['id', 'username', 'email'] },
      { model: Like }
    ]
  });
};

const createPost = async (userId: number, title: string, content: string) => {
  return Post.create({ userId, title, content });
};

const likePost = async (userId: number, postId: number) => {
  const [like, created] = await Like.findOrCreate({ where: { userId, postId } });
  if (!created) throw new Error('Post already liked by this user');
  return like;
};

export default { getAllPosts, createPost, likePost };

