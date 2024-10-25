import { Column, Entity, type ObjectId, ObjectIdColumn, OneToMany } from 'typeorm';
import { FileEntity } from './FileEntity.js';

@Entity({ name: 'file_extension' })
export class FileExtensionEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'varchar', length: 255, unique: true })
  extension?: string;

  @OneToMany(() => FileEntity, (file) => file.extension)
  files?: FileEntity[];
}