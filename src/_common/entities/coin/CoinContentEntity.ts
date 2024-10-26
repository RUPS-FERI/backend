import { Entity, type ObjectId, ObjectIdColumn, OneToMany, OneToOne } from 'typeorm';
import { LinkEntity } from '../link/index.js';
import { FileEntity } from '../file/index.js';
import { CoinEntity } from './CoinEntity.js';

@Entity({ name: 'coin_content' })
export class CoinContentEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @OneToMany(() => LinkEntity, (link) => link.coinContent)
  links?: LinkEntity[];

  @OneToMany(() => FileEntity, (link) => link.coinContent)
  files?: FileEntity[];

  @OneToOne(() => CoinEntity, (coin) => coin.content)
  coin?: CoinEntity;
}