import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamRepository } from './exam.repository';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService],
  imports: [TypeOrmModule.forFeature([ExamRepository])],
})
export class ExamsModule {}
