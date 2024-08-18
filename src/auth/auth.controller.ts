/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { SignInDto } from './dtos/signin.dto';


@Controller('auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }
}
