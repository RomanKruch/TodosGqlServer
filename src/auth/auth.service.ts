import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/registerUser.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    register(registerUserInput: RegisterUserInput): Promise<User> {
        const user = new this.userModel(registerUserInput);
        return user.save();
    }

    findById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    async updateToken(id: string, token: string | null): Promise<void> {
        await this.userModel.findByIdAndUpdate(id, { token });
    }
}
