import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async signIn(payload: SignInDto) {
        const user = await this.userRepository.getUserByEmail(payload.email); 
    }
    
    async signUp(payload: SignUpDto) {
        const user = await this.userRepository.getUserByEmail(payload.email); 
        if(user) {
            throw new BadRequestException('Email already exist');
        }

    }
}
