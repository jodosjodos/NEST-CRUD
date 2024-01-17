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
interface userProps {
  name: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

interface updateUserProps {
  name?: string;
  email?: string;
  role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get() // GET / users
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.service.findAll(role);
  }
  @Get(':id') // get/users/:id
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.service.findOne(+id);
  }

  @Post() // POST /users
  create(@Body() user: userProps) {
    return this.service.create(user);
  }

  @Patch(':id') //PATCH users/:id
  updateOne(@Param('id') id: string, @Body() userUpdate: updateUserProps) {
    return this.service.update(+id, userUpdate);
  }

  @Delete(':id') //Delete users/:id
  deleteOne(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
