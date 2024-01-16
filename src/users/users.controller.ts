import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() // GET / users
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): string[] {
    console.log(role);

    return [];
  }
  @Get(';id') // get/users/:id
  findOne(@Param('id') id: string): { id: string } {
    return { id };
  }

  @Post() // POST /users
  create(@Body() user: { name: string }): { name: string } {
    return user;
  }

  @Patch(':id') //PATCH users/:id
  updateOne(
    @Param('id') id: string,
    @Body() userUpdate: { name: string },
  ): { id: string } {
    return { id, ...userUpdate };
  }

  @Delete(':id') //Delete users/:id
  deleteOne(@Param('id') id: string): { id: string } {
    return { id };
  }
}
