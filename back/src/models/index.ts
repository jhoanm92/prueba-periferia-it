import { Sequelize } from 'sequelize';
import UserFactory from './user';
import PostFactory from './post';
import LikeFactory from './like';
// import LikeFactory from './like'; // si ya lo tienes

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = UserFactory(sequelize);
const Post = PostFactory(sequelize);
// const Like = LikeFactory(sequelize); // si lo necesitas

const Like = LikeFactory(sequelize);
Post.hasMany(Like, { foreignKey: 'postId' });
User.hasMany(Like, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
Like.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Post , Like };
