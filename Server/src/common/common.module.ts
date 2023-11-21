import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { JwtCustomModule } from './jwt/jwt.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [GraphqlModule, JwtCustomModule, DatabaseModule],
})
export class CommonModule {}
