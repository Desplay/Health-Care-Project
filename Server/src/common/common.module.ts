import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { JwtCustomModule } from './jwt/jwt.module';

@Module({
  imports: [GraphqlModule, JwtCustomModule],
})
export class CommonModule {}
