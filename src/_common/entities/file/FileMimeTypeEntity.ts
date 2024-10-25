import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from 'typeorm';
import { FileEntity } from './FileEntity.js';

@Entity({ name: 'file_mime_type' })
export class FileMimeTypeEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'varchar', length: 255, unique: true })
  type?: string;

  @OneToMany(() => FileEntity, (file) => file.mimeType)
  files?: FileEntity[];
}