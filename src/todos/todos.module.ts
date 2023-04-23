import { Module } from '@nestjs/common';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodosResolver, TodosService]
})
export class TodosModule {}
