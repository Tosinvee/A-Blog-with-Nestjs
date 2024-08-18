/* eslint-disable prettier/prettier */
 
/* eslint-disable prefer-const */
import {
    Inject,
    Injectable,
    RequestTimeoutException,
    UnauthorizedException,
    forwardRef,
  } from '@nestjs/common';
  import { UsersService } from 'src/users/provider/users.service';
  import { SignInDto } from '../dtos/signin.dto';
  import { HashingProvider } from './hashing.provider';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interfaces';
  
  @Injectable()
  export class SignInProvider {
    constructor(
      // Injecting UserService
      @Inject(forwardRef(() => UsersService))
      private readonly usersService: UsersService,
  
      /**
       * Inject the hashingProvider
       */
      private readonly hashingProvider: HashingProvider,

       /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,// this does the jwt injection for us in our class

    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)// a deendency injection for our configuration service
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}
  
    public async signIn(signInDto: SignInDto) {
      // find user by email ID
      let user = await this.usersService.findOneByEmail(signInDto.email);
      // Throw exception if user is not found
      // Above | Taken care by the findInByEmail method
  
      let isEqual: boolean = false;
  
      try {
        // Compare the password to hash
        isEqual = await this.hashingProvider.comparePassword(
          signInDto.password,
          user.password,
        );
      } catch (error) {
        throw new RequestTimeoutException(error, {
          description: 'Could not compare the password',
        });
      }
  
      if (!isEqual) {
        throw new UnauthorizedException('Password does not match');
      }
  
      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        } as ActiveUserData,
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
  
      // Return Access token
      return {
        accessToken,
      }; 
    }
  }