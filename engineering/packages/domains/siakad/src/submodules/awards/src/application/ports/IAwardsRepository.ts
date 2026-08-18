import { AwardProgram } from '../../domain/entities/AwardProgram';
import { AwardId } from '../../domain/value-objects/AwardsValueObjects';

export interface IAwardsRepository {
  saveAwardProgram(program: AwardProgram): Promise<void>;
  findAwardProgramById(id: AwardId): Promise<AwardProgram | null>;
}
