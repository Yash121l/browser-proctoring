import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attempts: AttemptsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('start')
  start(@Req() req: any, @Body('quizId') quizId: string) {
    return this.attempts.startAttempt(req.user.userId, quizId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  myAttempts(@Req() req: any) {
    return this.attempts.listForUser(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/submit')
  submit(@Param('id') id: string) {
    return this.attempts.submit(id);
  }
}

