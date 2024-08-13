/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-users.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from './config/profile.config';

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
    private usersRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration:ConfigType<typeof profileConfig>
  ) {}

 
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser= undefined
    // Check if user with email exists
    try{
     existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
  }catch(error){
    throw new RequestTimeoutException('unable to process your request at the moments ',
      {
        description:' Error connecting to the database'
      }
    )
  }
  if(existingUser){
    throw new BadRequestException('user already exixts, please check your email')
  }
  
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    // Create the user
    return newUser;
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