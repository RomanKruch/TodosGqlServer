import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { hash, genSalt } from 'bcrypt';

@ObjectType()
@Schema({ versionKey: false })
export class User {
    @Field(type => String)
    _id: Types.ObjectId;

    @Field()
    @Prop()
    username: string;

    @Field()
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Field({ nullable: true })
    @Prop({ default: null })
    token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const SALT = await genSalt(10);
    this.password = await hash(this.password, SALT);
});
