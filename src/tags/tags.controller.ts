/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService:TagsService
    ){}
    
    @Post()
    public create(@Body() createTagDto:CreateTagDto){
        return this.tagsService.create(createTagDto)

    }
    @Delete()
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
    @Delete()
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }

}
