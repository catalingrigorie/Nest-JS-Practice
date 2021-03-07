import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column('text', { array: true, default: '{}' })
  questions: Question[];

  @ManyToOne((type) => User, (user) => user.exams, { eager: false })
  createdBy: User;

  @ManyToMany((type) => User, (user) => user.createdExams, { eager: false })
  enrolledUsers: User[];
}

export interface Question {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
}
