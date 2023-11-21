import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URL || process.env.MONGODB_URI,
      }),
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
