import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  create(
    createPostDto: CreatePostDto,
    userId: string,
  ) {
    return this.prisma.posts.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
    });
  }

  findAll() {
    return this.prisma.posts.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.posts.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.posts.delete({
      where: { id },
    });
  }

}