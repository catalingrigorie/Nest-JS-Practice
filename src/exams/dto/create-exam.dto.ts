import { Question } from '../exam.entity';

export class CreateExamDto {
  title: string;
  startDate: string;
  endDate: string;
  questions: Question[];
}
