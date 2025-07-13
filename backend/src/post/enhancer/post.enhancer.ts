export abstract class PostEnhancer<T, Y> {
  abstract enhance(dto: T): Y;
}
