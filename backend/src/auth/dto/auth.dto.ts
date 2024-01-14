import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(2)
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[^a-zA-Z\d]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
