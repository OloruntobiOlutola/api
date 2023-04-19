import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(createUserDTO: CreateUserDTO) {
    return this.userRepository.save({ ...createUserDTO });
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
    const user = await this.getUser(id);
    user.firstname = updateUserDTO.firstname
      ? updateUserDTO.firstname
      : user.firstname;
    user.lastname = updateUserDTO.lastname
      ? updateUserDTO.lastname
      : user.lastname;
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    if (user) {
      return this.userRepository.remove(user);
    }
    return { message: 'User not found' };
  }
}
