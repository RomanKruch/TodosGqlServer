import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@InputType()
export class UpdateTodo {
    @Field()
    @IsString()
    @Length(3, 30)
    title: string;

    @Field()
    @IsBoolean()
    completed: boolean;
}
