import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ cors: { origin: true }, namespace: '/proctor' })
export class ProctoringGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  handleConnection(client: Socket) {
    // eslint-disable-next-line no-console
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    // eslint-disable-next-line no-console
    console.log('Client disconnected', client.id);
  }

  @SubscribeMessage('PROCTOR_EVENT')
  handleProctorEvent(
    @MessageBody()
    data: {
      attemptId: string;
      type: 'TAB_SWITCH' | 'COPY' | 'PASTE' | 'NO_FACE';
      timestamp: string | number;
    },
  ) {
    // persist event to DB and emit admin alert
    const ts = new Date(Number(data.timestamp) || (data.timestamp as any));
    this.prisma.violation
      .create({ data: { attemptId: data.attemptId, type: data.type, timestamp: ts } })
      .catch(() => void 0);
    this.server.emit('VIOLATION_ALERT', data);
  }
}
