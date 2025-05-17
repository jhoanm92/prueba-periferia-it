import {
  Model,
  DataTypes,
  Optional,
  Sequelize
} from 'sequelize';

export interface LikeAttributes {
  id: number;
  userId: number;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LikeCreationAttributes = Optional<LikeAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Like {
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'likes',
    }
  );

  return Like;
}
