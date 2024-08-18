/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './provider/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './provider/create-user.provider';
import { FindOneUserByEmailProvider } from './provider/find-one-user-by-email.provider';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UsersService,],
  //imports: [forwardRef(() => AuthModule)],
  imports: [TypeOrmModule.forFeature([User]),
   ConfigModule.forFeature(profileConfig),
   forwardRef(()=> AuthModule)
]

})
export class UsersModule {}
