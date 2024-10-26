import {
  Column,
  Entity,
  type ObjectId,
  ObjectIdColumn,
  OneToMany, OneToOne,
} from 'typeorm';
import { CoinPriceEntity } from './CoinPriceEntity.js';
import { CoinContentEntity } from './CoinContentEntity.js';

class PriceEntity {}

@Entity({ name: 'coin' })
export class CoinEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'int', unique: true, name: 'external_id' })
  externalId?: number;

  @Column({ type: 'varchar', length: 255 })
  code?: string;

  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug?: string;

  @OneToOne(() => CoinContentEntity, (content) => content.coin)
  content?: CoinContentEntity;

  @OneToMany(() => CoinPriceEntity, (price) => price.coin)
  prices?: PriceEntity[];
}