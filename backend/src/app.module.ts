import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://tahseen:1029384756@cluster0.ccx1k.mongodb.net/CommerceWebsite?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
