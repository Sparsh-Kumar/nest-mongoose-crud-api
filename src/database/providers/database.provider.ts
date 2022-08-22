/* eslint-disable import/no-named-as-default */
import * as mongoose from 'mongoose';
import DATABASE_CONNECTION from '../constants';

const databaseProvider = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<void> => {
      await mongoose.connect(process.env.MONGODB_URI);
    },
  },
];

export default databaseProvider;
