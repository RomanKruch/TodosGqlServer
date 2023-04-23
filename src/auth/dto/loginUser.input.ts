import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class LoginUserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @Length(8, 24)
    password: string;
}
