import { Entity, type ObjectId, ObjectIdColumn, OneToMany, OneToOne } from 'typeorm';
import { LinkEntity } from '../link/LinkEntity.js';
import { FileEntity } from '../file/FileEntity.js';
import type { CoinEntity } from './CoinEntity.js';

@Entity({ name: 'coin_content' })
export class CoinContentEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @OneToMany(() => LinkEntity, (link) => link.coinContent)
  links?: LinkEntity[];

  @OneToMany(() => FileEntity, (link) => link.coinContent)
  files?: FileEntity[];

  @OneToOne(() => CoinContentEntity, (content) => content.coin)
  coin?: CoinEntity;
}