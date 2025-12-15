import { Module } from '@nestjs/common';
import { ProctoringGateway } from './ws.proctoring.gateway';

@Module({
  providers: [ProctoringGateway],
})
export class WebsocketModule {}

