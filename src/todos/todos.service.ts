import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo } from './todo.entity';
import { CreateTodo } from './dto/createTodo';
import { UpdateTodo } from './dto/updateTodo';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

    getAll(owner: Types.ObjectId): Promise<Todo[]> {
        return this.todoModel.find({ owner });
    }

    getById(_id: string, owner: Types.ObjectId): Promise<Todo | null> {
        return this.todoModel.findOne({ _id, owner });
    }

    getByTitle(title: string, owner: Types.ObjectId): Promise<Todo | null> {
        return this.todoModel.findOne({title, owner})
    }

    create(createTodo: CreateTodo, owner: Types.ObjectId): Promise<Todo> {
        return this.todoModel.create({ ...createTodo, owner });
    }

    remove(_id: string, owner: Types.ObjectId): Promise<Todo> {
        return this.todoModel.findOneAndRemove({ _id, owner });
    }

    update(
        _id: string,
        updateTodo: UpdateTodo,
        owner: Types.ObjectId,
    ): Promise<Todo> {
        return this.todoModel.findOneAndUpdate({ _id, owner }, updateTodo, {
            new: true,
        });
    }
}
