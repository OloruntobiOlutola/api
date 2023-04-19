import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO, UpdateUserDTO } from 'apps/auth/src/auth.dto';
import {
  CreateProfileDTO,
  UpdateProfileDTO,
} from 'apps/profile/src/profile.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private profileService: ClientProxy,
  ) {}

  @Get('users')
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    console.log(id);
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      { id },
    );
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.authService.send(
      {
        cmd: 'update-user',
      },
      { id, ...updateUserDTO },
    );
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.send(
      {
        cmd: 'delete-user',
      },
      { id },
    );
  }

  @Post('users')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.send(
      {
        cmd: 'create-user',
      },
      { ...createUserDTO },
    );
  }

  @Get('users/:id/profiles')
  async getProfile(@Param('id') id: string) {
    return this.profileService.send(
      {
        cmd: 'get-profile',
      },
      { userId: id },
    );
  }

  @Post('users/:id/profiles')
  async createProfile(
    @Body() createProfileDTO: CreateProfileDTO,
    @Param('id') id: string,
  ) {
    return this.profileService.send(
      {
        cmd: 'create-profile',
      },
      { ...createProfileDTO, userId: id },
    );
  }

  @Patch('users/:id/profiles')
  async updateProfile(
    @Body() updateProfileDTO: UpdateProfileDTO,
    @Param('id') id: string,
  ) {
    return this.profileService.send(
      {
        cmd: 'update-profile',
      },
      { ...updateProfileDTO, userId: id },
    );
  }

  @Delete('users/:id/profiles')
  async deleteProfile(@Param('id') id: string) {
    return this.profileService.send(
      {
        cmd: 'delete-profile',
      },
      { userId: id },
    );
  }
}
