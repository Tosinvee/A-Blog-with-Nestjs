/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import  appConfig  from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import environmentValidation from './config/environment.validation';
import { PaginationModule } from './common/pagination/pagination.module';

const ENV = process.env.NODE_ENV;


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, PostModule, AuthModule,TagsModule,PaginationModule,
    ConfigModule.forRoot({isGlobal:true,
       envFilePath:!ENV ? '.env' :`.env.${ENV}`,
      load:[appConfig, databaseConfig],
      validationSchema: environmentValidation
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>({type: 'postgres',
      //entities: [User],
      synchronize: configService.get('database.synchronize'),
      port: configService.get('database.port'),
      username: configService.get('database.user'),
      password: configService.get('database.password'),
      host: configService.get('database.host'),
      autoLoadEntities: configService.get('database.autoLoadEntities'),
      database: configService.get('database.name'),
     }),
     }), 
     TagsModule,
    MetaOptionsModule],
    
})
export class AppModule {}
