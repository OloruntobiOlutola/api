import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import ProfileEntity from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDTO, UpdateProfileDTO } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async getProfile(userId: string) {
    return this.profileRepository.findOneBy({ userId });
  }

  async createProfile(createProfileDTO: CreateProfileDTO) {
    return this.profileRepository.save({ ...createProfileDTO });
  }

  async updateProfile(updateProfileDTO: UpdateProfileDTO) {
    const profile = await this.getProfile(updateProfileDTO.userId);
    profile.age = updateProfileDTO.age ? updateProfileDTO.age : profile.age;
    profile.nationality = updateProfileDTO.nationality
      ? updateProfileDTO.nationality
      : profile.nationality;
    profile.gender = updateProfileDTO.gender
      ? updateProfileDTO.gender
      : profile.gender;
    return this.profileRepository.save(profile);
  }

  async deleteProfile(userId: { userId: string }) {
    const profile = await this.getProfile(userId.userId);
    if (profile) {
      return this.profileRepository.remove(profile);
    }
    return { message: 'No profile to delete' };
  }
}
