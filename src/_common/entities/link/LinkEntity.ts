import { Column, Entity, JoinColumn, ManyToOne, type ObjectId, ObjectIdColumn } from 'typeorm';
import { CoinContentEntity } from '../coin/index.js';

@Entity({ name: 'link' })
export class LinkEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'varchar', length: 255, default: '' })
  name?: string;

  @Column({ type: 'varchar', length: 2048, unique: true })
  link?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt?: Date;

  @ManyToOne(() => CoinContentEntity, (content) => content.links)
  @JoinColumn({ name: 'coin_content_id' })
  coinContent?: CoinContentEntity;
}