import { IsString, IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum Provider {
  google = 'google', 
  facebook = 'facebook', 
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Provider)
  @IsNotEmpty()
  provider: Provider;

  @IsOptional()
  @IsString() 
  image: string
}
