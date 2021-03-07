import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './exam.entity';

@EntityRepository(Exam)
export class ExamRepository extends Repository<Exam> {
  async createExam(createExamDto: CreateExamDto, user: User): Promise<Exam> {
    const exam = new Exam();

    console.log(createExamDto);

    exam.title = createExamDto.title;
    exam.startDate = createExamDto.startDate;
    exam.endDate = createExamDto.endDate;
    exam.questions = createExamDto.questions;
    exam.createdBy = user;

    await exam.save();

    return exam;
  }
}
