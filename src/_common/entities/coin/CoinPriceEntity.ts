import { Column, Entity, JoinColumn, ManyToOne, type ObjectId, ObjectIdColumn } from 'typeorm';
import { CoinEntity } from './CoinEntity.js';

@Entity({ name: 'coin_price' })
export class CoinPriceEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date?: Date;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    default: 0,
    transformer: {
      from: (value: string) => +value,
      to: (value: number) => value,
    },
  })
  price?: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    default: 0,
    transformer: {
      from: (value: string) => +value,
      to: (value: number) => value,
    },
  })
  volume?: number;

  @ManyToOne(() => CoinEntity, (coin) => coin.prices)
  @JoinColumn({ name: 'coin_id' })
  coin?: CoinEntity;
}