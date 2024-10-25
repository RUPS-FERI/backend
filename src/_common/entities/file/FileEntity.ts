import { Column, Entity, JoinColumn, ManyToOne, type ObjectId, ObjectIdColumn } from 'typeorm';
import { FileExtensionEntity } from './FileExtensionEntity.js';
import { FileMimeTypeEntity } from './FileMimeTypeEntity.js';

@Entity({ name: 'file' })
export class FileEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'text', length: 255 })
  name?: string;

  @Column({ type: 'int' })
  size?: number;

  @ManyToOne(() => FileExtensionEntity, (fileExtension) => fileExtension.files)
  @JoinColumn({ name: 'file_extension_id' })
  extension?: FileExtensionEntity

  @ManyToOne(() => FileMimeTypeEntity, (fileMimeTyoe) => fileMimeTyoe.files)
  @JoinColumn({ name: 'file_mime_type_id' })
  mimeType?: FileMimeTypeEntity;
}