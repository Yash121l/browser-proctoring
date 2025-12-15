import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzes: QuizzesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Req() req: any, @Body() dto: CreateQuizDto) {
    return this.quizzes.create(req.user.userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  list() {
    return this.quizzes.list();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id: string) {
    return this.quizzes.get(id);
  }
}

