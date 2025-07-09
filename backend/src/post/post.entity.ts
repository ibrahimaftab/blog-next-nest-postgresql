import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from 'src/category/category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  summary: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  image: string;

  @Column()
  slug: string;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];
}
