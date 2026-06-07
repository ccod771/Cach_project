import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';


import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('posts')
export class PostsController 
{

  constructor(
    private readonly postsService: PostsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: any,
  ) {
    return this.postsService.create(
      createPostDto,
      user.id,
    );
  }

  @Get()
  findAll() 
  {

    return this.postsService.findAll();
  
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.postsService.remove(id);
  }

}



