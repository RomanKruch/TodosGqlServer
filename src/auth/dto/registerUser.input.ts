import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length, IsString } from 'class-validator';

@InputType()
export class RegisterUserInput {
    @Field()
    @IsString()
    @Length(3, 20)
    username?: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @Length(8, 24)
    password: string;
}
