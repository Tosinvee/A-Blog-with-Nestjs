/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-users.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from './../config/profile.config';
import { CreateUserProvider } from './create-user.provider';

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration:ConfigType<typeof profileConfig>,

    //inject createUserProvider
    private readonly createUserProvider: CreateUserProvider,
  ) {}

 
  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto)
  }
  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) 
  {
    let loggenIn = false;
    if (!loggenIn) {
      throw new HttpException(
        {
          status: HttpStatus.MOVED_PERMANENTLY,
          error: `The API endpoint doesn't exist anymore`,
          fileName: 'users.service.ts',
          lineNumber: 103,
        },
        HttpStatus.MOVED_PERMANENTLY,
        {
          cause: new Error(),
          description:
            'Occured because the API endpoint was permanently moved to a new location',
        },
      );
    }
  }

    
    

  /**
   * Public method used to find one user using the ID of the user
   */
  public async findOneById(id: number) {
    let user = undefined;

    try{
      user =await this.usersRepository.findOneBy({
        id
      })
      
    }catch(error){
      throw new RequestTimeoutException('unable to process your request at the moments ',
      {
        description:' Error connecting to the database'
      }
    )

    }

    if(!user){
      throw new BadRequestException('user id does not exist')
    }
    return user
     
}
}