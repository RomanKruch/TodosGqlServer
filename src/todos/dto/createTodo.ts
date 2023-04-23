import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateTodo {
    @Field()
    @IsString()
    @Length(3, 35)
    title: string;
}
