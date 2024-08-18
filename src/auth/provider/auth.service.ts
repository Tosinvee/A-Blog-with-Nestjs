/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { UsersService } from 'src/users/provider/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly signInProvider: SignInProvider,
  ) {}

  public async signIn(signInDto:SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  

  public isAuth() {
    return true;
  }
}
