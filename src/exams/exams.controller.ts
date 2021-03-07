import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './exam.entity';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private examService: ExamsService) {}

  @Post('create')
  createExam(
    @Body()
    createExamDto: CreateExamDto,

    @GetUser()
    user: User
  ): Promise<Exam> {
    console.log(createExamDto);
    return this.examService.createExam(createExamDto, user);
  }
}
