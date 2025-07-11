import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { PostModule } from 'src/post/module/post.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'myapp_db',
      entities: [],

      // TODOS: remove synchronize in production
      synchronize: true,
      autoLoadEntities: true, // ✅ this loads all entities registered via TypeOrmModule.forFeature()
    }),
    PostModule,
  ],
})
export class AppModule {}
