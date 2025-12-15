import { IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  type: string;

  @IsString()
  content: string;

  @IsOptional()
  options?: any;

  @IsNotEmpty()
  answer: any;
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  duration: number;

  @IsDateString()
  startsAt: string;

  @IsDateString()
  endsAt: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

