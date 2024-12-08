import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateRecentStudySetDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  studySetId: string;
}
