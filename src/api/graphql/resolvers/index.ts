import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../../interfaces/IUser';

export const graphQlResolvers = {
  users: async () => {
    const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
    const users = await UserModel.find({});
    return users;
  },
};
