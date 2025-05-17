import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await User.findOne({ where: { email } });
  console.log('User found:', user);
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export default { login };
