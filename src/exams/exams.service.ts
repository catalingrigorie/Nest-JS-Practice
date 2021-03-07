import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './exam.entity';
import { ExamRepository } from './exam.repository';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamRepository)
    private examRepository: ExamRepository
  ) {}

  async createExam(createExamDto: CreateExamDto, user: User): Promise<Exam> {
    return this.examRepository.createExam(createExamDto, user);
  }
}
