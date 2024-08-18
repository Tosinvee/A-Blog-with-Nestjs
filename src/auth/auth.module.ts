/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { SignInProvider } from './provider/sign-in.provider';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService,{
    provide:HashingProvider,
    useClass:BcryptProvider, 
  }, SignInProvider ],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),  

  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
