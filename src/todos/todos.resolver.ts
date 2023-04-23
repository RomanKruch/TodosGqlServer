import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodo } from './dto/createTodo';
import { UpdateTodo } from './dto/updateTodo';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
    ConflictException,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { getUserFromContext } from 'src/helpers/getUserFromContext';

@Resolver()
@UseGuards(new JwtGuard(JwtStrategy))
export class TodosResolver {
    constructor(private todosService: TodosService) {}

    @Query(returns => [Todo])
    async getTodos(@Context() context: any) {
        const user = getUserFromContext(context);

        return await this.todosService.getAll(user._id);
    }

    @Query(returns => Todo)
    async getTodoById(@Args('id') id: string, @Context() context: any) {
        const user = getUserFromContext(context);

        const todo = await this.todosService.getById(id, user._id);

        if (!todo) {
            throw new NotFoundException();
        }
        return todo;
    }

    @Mutation(returns => Todo)
    async createTodo(
        @Args('createTodo') createTodo: CreateTodo,
        @Context() context: any,
    ) {
        const user = getUserFromContext(context);

        const todo = await this.todosService.getByTitle(
            createTodo.title,
            user._id,
        );

        if (todo) {
            throw new ConflictException();
        }
        return await this.todosService.create(createTodo, user._id);
    }

    @Mutation(returns => Todo)
    async removeTodo(@Args('id') id: string, @Context() context: any) {
        const user = getUserFromContext(context);

        return await this.todosService.remove(id, user._id);
    }

    @Mutation(returns => Todo)
    async updateTodo(
        @Args('id') id: string,
        @Args('updateTodo') updateTodo: UpdateTodo,
        @Context() context: any,
    ) {
        const user = getUserFromContext(context);

        return await this.todosService.update(id, updateTodo, user._id);
    }
}
