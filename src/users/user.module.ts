import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { RegisterMiddleware } from 'src/register/register.middleware';
import { TokenModule } from 'src/token/token.module';
import { UserMiddleware } from './user.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // JwtModule.register({
    //   secret: process.env.TOKEN_SECRET_KEY,
    // }),
    TokenModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('/users');
  }
}
