// src/media/media.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('generate-upload-url')
  async generateUploadUrl(
    @Body() body: { fileName: string; fileType: string },
  ) {
    try {
      const { fileName, fileType } = body;
      const result = await this.mediaService.generateUploadUrl(fileName, fileType);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
