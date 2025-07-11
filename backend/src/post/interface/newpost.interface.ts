import { Category } from 'src/category/entity/category.entity';
import { Post } from '../entity/post.entity';

export interface NewPost extends Omit<Post, 'id' | 'categories'> {
  categories: Category[];
}
