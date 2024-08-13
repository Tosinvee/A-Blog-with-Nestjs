/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AuthService } from './provider/auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}
}