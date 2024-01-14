import { AuthDto } from './dto/auth.dto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.model';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async create(User: AuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(User.password, 10);
      const newUser = new this.userModel({
        name: User.name,
        email: User.email,
        password: hashedPassword,
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  async signin(User: AuthDto) {
    const user = await this.userModel.findOne({ email: User.email }).exec();

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passMatch = await bcrypt.compare(User.password, user.password);

    if (!passMatch) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(id: number, email: string) {
    const payload = {
      sub: id,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      id,
      email,
      access_token: token,
    };
  }

  loggedIn(): string {
    return 'Welcome to the application';
  }
}
