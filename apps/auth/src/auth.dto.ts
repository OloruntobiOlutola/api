import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  firstname: string;

  lastname: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
