import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Category, (category) => category.id)
  categories: Category[];
}
