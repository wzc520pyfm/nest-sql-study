/**
 * User实体
 */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  /**
   * 定义关系: 一个user可以有多个photo,那么就是一对多的关系
   */
  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Array<Photo>;
}
