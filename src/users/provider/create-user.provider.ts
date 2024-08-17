/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { HashingProvider } from "src/auth/provider/hashing.provider";

@Injectable()
export class CreateUserProvider{
    constructor(
        // inject user repository
        @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    //iject hashing provider
    @Inject(forwardRef(()=> HashingProvider))
    private readonly hashingProvider:HashingProvider
    ){}


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
  
    let newUser = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password)
    });
    newUser = await this.usersRepository.save(newUser);
    // Create the user
    return newUser;
  }}

