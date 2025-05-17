import { User, Post } from '../models';

const getProfile = async (userId: number) => {
  console.log("userId**");
  console.log(userId);
  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email'],
    include: [{ model: Post }],
  });
  if (!user) throw new Error('User not found');
  return user;
};

export default { getProfile };
