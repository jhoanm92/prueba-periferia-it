import {
  Model,
  DataTypes,
  Optional,
  Sequelize
} from 'sequelize';

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// 'id', 'createdAt' y 'updatedAt' son opcionales en la creación
export type PostCreationAttributes = Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Post {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'Posts'
    }
  );
  return Post;
}
