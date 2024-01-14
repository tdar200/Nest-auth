import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
// import { AuthDtoType } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signin({
      email: signInDto.email,
      password: signInDto.password,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signUp(@Body() signUpDto: AuthDto) {
    return this.authService.create({
      email: signUpDto.email,
      name: signUpDto.name,
      password: signUpDto.password,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/loggedIn')
  home(): { message: string } {
    return { message: this.authService.loggedIn() };
  }
}
