import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { CreateUserDTO } from './auth.dto';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
    private readonly httpService: HttpService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext, @Payload() id: { id: string }) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.getUser(parseInt(id.id));
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(
    @Ctx() context: RmqContext,
    @Payload() createUserDTO: CreateUserDTO,
  ) {
    this.sharedService.acknowledgeMessage(context);
    return await this.authService.createUser({ ...createUserDTO });
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUser(@Ctx() context: RmqContext, @Payload() data: any) {
    const { id, ...updateUserDTO } = data;
    this.sharedService.acknowledgeMessage(context);
    return this.authService.updateUser(parseInt(id), updateUserDTO);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Ctx() context: RmqContext, @Payload() id: { id: string }) {
    this.sharedService.acknowledgeMessage(context);
    const index = parseInt(id.id);
    this.httpService
      .delete(`http://localhost:3000/users/${index}/profiles`)
      .subscribe();
    return this.authService.deleteUser(index);
  }
}
