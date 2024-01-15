// import { IsNotEmpty } from 'class-validator';

import { IsOptional } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  password?: string;
}
