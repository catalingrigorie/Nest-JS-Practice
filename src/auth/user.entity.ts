import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exam } from 'src/exams/exam.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  type: userTypes;

  @Column()
  salt: string;

  @OneToMany((type) => Exam, (exam) => exam.createdBy, { eager: false })
  exams: Exam[];

  @ManyToMany((type) => Exam, (exam) => exam.enrolledUsers, { eager: false })
  createdExams: Exam[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

export enum userTypes {
  student = 'student',
  teacher = 'teacher',
}
