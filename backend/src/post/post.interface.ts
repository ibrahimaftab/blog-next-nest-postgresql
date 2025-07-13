import { Category } from 'src/category/category.entity';
import { Post } from './post.entity';

export interface NewPost extends Omit<Post, 'id' | 'categories'> {
  categories: Category[];
}
