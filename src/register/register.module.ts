import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { RegisterMiddleware } from './register.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RegisterMiddleware).forRoutes('register');
  }
}
