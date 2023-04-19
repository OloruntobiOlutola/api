import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export default class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  nationality: string;

  @Column()
  userId: string;
}
