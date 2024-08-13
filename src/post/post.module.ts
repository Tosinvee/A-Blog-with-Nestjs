/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [UsersModule,TagsModule,PaginationModule, TypeOrmModule.forFeature([Post,MetaOption ])],
})
export class PostModule {}
