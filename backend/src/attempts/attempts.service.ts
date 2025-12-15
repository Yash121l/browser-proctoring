import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttemptsService {
  constructor(private prisma: PrismaService) {}

  async startAttempt(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return this.prisma.attempt.create({ data: { userId, quizId } });
  }

  listForUser(userId: string) {
    return this.prisma.attempt.findMany({ where: { userId }, orderBy: { startedAt: 'desc' } });
  }

  submit(attemptId: string) {
    return this.prisma.attempt.update({ where: { id: attemptId }, data: { submittedAt: new Date() } });
  }
}

