import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  /**
   * 创建一个 photo
   * @param createInput
   */
  async create(createInput: Photo): Promise<void> {
    await this.photoRepository.save(createInput);
  }

  /**
   * 查询指定用户的所有 photo
   * @param userId
   * @returns
   */
  async findAll(userId: number): Promise<Photo[]> {
    return await this.photoRepository.find({ where: { user: { id: userId } } });
  }
}
