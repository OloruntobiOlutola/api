import { PartialType } from '@nestjs/mapped-types';

export class CreateProfileDTO {
  age: string;

  gender: string;

  nationality: string;

  userId: string;
}

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}
