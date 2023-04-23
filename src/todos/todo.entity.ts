import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/auth/user.entity';

@ObjectType()
@Schema({ versionKey: false })
export class Todo {
    @Field(type => String)
    _id: Types.ObjectId;

    @Field()
    @Prop()
    title: string;

    @Field({ defaultValue: false })
    @Prop({ default: false })
    completed?: boolean;

    @Prop({type: Types.ObjectId, ref: User.name}) 
    owner: Types.ObjectId
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
