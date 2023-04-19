import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  MessagePattern,
  Ctx,
  RmqContext,
  Payload,
} from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { CreateProfileDTO } from './profile.dto';

@Controller()
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-profile' })
  async getUser(
    @Ctx() context: RmqContext,
    @Payload() userId: { userId: string },
  ) {
    this.sharedService.acknowledgeMessage(context);
    const profile = await this.profileService.getProfile(userId.userId);
    if (!profile) {
      return { message: 'Profile not found' };
    }
    return profile;
  }

  @MessagePattern({ cmd: 'create-profile' })
  async createUser(
    @Ctx() context: RmqContext,
    @Payload() createProfileDTO: CreateProfileDTO,
  ) {
    this.sharedService.acknowledgeMessage(context);
    return this.profileService.createProfile({ ...createProfileDTO });
  }

  @MessagePattern({ cmd: 'update-profile' })
  async updateProfile(@Ctx() context: RmqContext, @Payload() data: any) {
    this.sharedService.acknowledgeMessage(context);
    return this.profileService.updateProfile(data);
  }

  @MessagePattern({ cmd: 'delete-profile' })
  async deleteProfile(
    @Ctx() context: RmqContext,
    @Payload() userId: { userId: string },
  ) {
    this.sharedService.acknowledgeMessage(context);
    return this.profileService.deleteProfile(userId);
  }
}
