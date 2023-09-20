import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

@Injectable()
export class DemoQueryService {
  @Query(() => String)
  demoQuery(): string {
    return 'test Query';
  }
}
