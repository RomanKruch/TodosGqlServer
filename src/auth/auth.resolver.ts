import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Mutation } from '@nestjs/graphql';
import { RegisterUserInput } from './dto/registerUser.input';
import { User } from './user.entity';
import {
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common/exceptions';
import { LoginUserInput } from './dto/loginUser.input';
import { compare } from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { getUserFromContext } from 'src/helpers/getUserFromContext';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Mutation(type => User)
    async register(
        @Args('registerUserInput') registerUserInput: RegisterUserInput,
    ) {
        const user = await this.authService.findByEmail(
            registerUserInput.email,
        );

        if (user) {
            throw new ConflictException();
        }

        const newUser = await this.authService.register(registerUserInput);

        const token = this.jwtService.sign(
            { id: newUser._id },
            { secret: 'secret' },
        );

        await this.authService.updateToken(`${newUser._id}`, token);
        newUser.token = token;

        return newUser;
    }

    @Mutation(type => User)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        const { email, password } = loginUserInput;
        const user = await this.authService.findByEmail(email);

        if (!user || !(await compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign(
            { id: user._id },
            { secret: 'secret' },
        );

        await this.authService.updateToken(`${user._id}`, token);
        user.token = token;

        return user;
    }

    @Query(type => User)
    @UseGuards(new JwtGuard(JwtStrategy))
    async logout(@Context() context: any) {
        const user = getUserFromContext(context);

        await this.authService.updateToken(user._id, null);

        return user;
    }

    @Query(type => User)
    @UseGuards(new JwtGuard(JwtStrategy))
    async refresh(@Context() context: any) {
        const user = getUserFromContext(context);
        return user;
    }
}
