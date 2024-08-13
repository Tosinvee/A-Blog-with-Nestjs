/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-users.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        //injecting the user servicer
        private readonly usersService: UsersService
    ){}
//Post users
    @Post()
    public createUsers(@Body() createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    //get users by id
    @Get('/:id?')
    @ApiOperation({
        summary: 'fetches a list of registered users on the application'
    })
    @ApiResponse({
        status: 200
    })
    @ApiQuery({
        name:'limit',
        type: 'number',
        required: false,
        description: 'The number of entries returned per query',
        example:'10'
    })
    @ApiQuery({
        name:'page',
        type: 'number',
        required: false,
        description: 'The position of the page number you want the api to return',
        example: '1'
    })
    public getUserById(
    @Param() GetUserParamDto:GetUsersParamDto, 
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,// a default value when limit isnt included
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number)// a default value when page isnt included
    
    {
           return this.usersService.findAll(GetUserParamDto, limit, page);
    }
    @Patch()
        public updateUser(@Body() PatchUserDto: PatchUserDto){
            return PatchUserDto
        }

    @Delete()
    public deleteUser(){
        return 'delete a user'
    }
    
}
