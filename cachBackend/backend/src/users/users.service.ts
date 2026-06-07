import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) 
  {

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.prisma.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() 
  
  {

    return this.prisma.users.findMany();
  
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) 
  {

    if (updateUserDto.email) {
      const emailExists = await this.prisma.users.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists && emailExists.id !== id) {
        throw new BadRequestException('Email já está em uso');
      }
    }

    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}