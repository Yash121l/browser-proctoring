import { Controller, Get, Query } from '@nestjs/common';
import { RecordingsService } from './recordings.service';

@Controller('recordings')
export class RecordingsController {
  constructor(private readonly recordings: RecordingsService) {}

  @Get('upload-url')
  getUploadUrl(@Query('key') key: string, @Query('contentType') contentType: string) {
    return this.recordings.getUploadUrl(key, contentType);
  }
}

