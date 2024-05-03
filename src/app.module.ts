import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ConfigModule } from '@nestjs/config';
import { MusicModule } from './musics/music.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from './token/token.module';
import { TypeMusicModule } from './typeMusic/typeMusic.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOURL),
    UsersModule,
    LoginModule,
    RegisterModule,
    MusicModule,
    TypeMusicModule
    // RouterModule.register([{
    //   path: "/api/v1",
    //   children: [
    //     {
    //       path: "/"
    //     }
    //   ]
    // }]),
  ],
})
export class AppModule {}
