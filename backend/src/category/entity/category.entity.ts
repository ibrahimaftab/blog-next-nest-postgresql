import { Post } from 'src/post/entity/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  slug: string;

  @ManyToOne(() => Post, (post) => post.categories)
  post: Post[];
}
