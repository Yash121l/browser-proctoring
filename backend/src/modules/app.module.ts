import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { RecordingsModule } from '../recordings/recordings.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { QuizzesModule } from '../quizzes/quizzes.module';
import { AttemptsModule } from '../attempts/attempts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WebsocketModule,
    RecordingsModule,
    AuthModule,
    UsersModule,
    QuizzesModule,
    AttemptsModule,
  ],
})
export class AppModule {}
