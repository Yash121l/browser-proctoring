import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  create(adminId: string, dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        description: dto.description,
        duration: dto.duration,
        startsAt: new Date(dto.startsAt),
        endsAt: new Date(dto.endsAt),
        createdById: adminId,
        questions: {
          create: dto.questions.map((q) => ({
            type: q.type,
            content: q.content,
            options: q.options ?? undefined,
            answer: q.answer,
          })),
        },
      },
      include: { questions: true },
    });
  }

  list() {
    return this.prisma.quiz.findMany({ orderBy: { startsAt: 'desc' } });
  }

  get(id: string) {
    return this.prisma.quiz.findUnique({ where: { id }, include: { questions: true } });
  }
}

