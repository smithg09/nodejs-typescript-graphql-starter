import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../../interfaces/IUser';

export const graphQlResolvers = {
  me: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    } else {
      return req.currentUser;
    }
  },
  allusers: async () => {
    const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
    const users = await UserModel.find({});
    return users;
  },
};
