import { Controller, HttpCode, HttpException, HttpStatus, Get } from "@nestjs/common";
import { TypeMusicService } from "./typeMusic.service";
import { TypeMusic } from "src/schemas/TypeMusic.schema";

@Controller('typeMusic')

export class TypeMusicController{
    constructor(private typeMusicService: TypeMusicService){}

    @Get('/')
    @HttpCode(200)
    async getAllTypeMusics(): Promise<TypeMusic[]>
    {
        try {
            return this.typeMusicService.findAll()
        } catch (error) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}