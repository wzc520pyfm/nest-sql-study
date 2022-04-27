import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from 'src/common/interfaces/result.interface';
import { Photo as PhotoEntity } from './photo.entity';
import { PhotoService } from './photo.service';
import { Request } from 'express';

@Controller('photos')
export class PhotoController {
  constructor(
    @Inject(PhotoService) private readonly photoService: PhotoService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @Req() req: any,
    @Body() createInput: PhotoEntity,
  ): Promise<Result> {
    createInput.user = req.user;
    await this.photoService.create(createInput);
    return { statusCode: 200, message: '创建帖子成功' };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: any): Promise<Result> {
    const photos = await this.photoService.findAll(req.user.id);
    return { statusCode: 200, message: '查询成功', data: photos };
  }
}
