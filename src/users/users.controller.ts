import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get() // GET / users
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.service.findAll(role);
  }
  @Get(':id') // get/users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post() // POST /users
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Patch(':id') //PATCH users/:id
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id') //Delete users/:id
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
