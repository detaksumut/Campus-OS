import { RegistrationFacade } from '../application/facade/RegistrationFacade';
import { RegistrationRequestDTO, RegistrationResponseDTO } from '../application/dto/RegistrationDTO';
import { ExecutionContext } from '@campus-os/application-kernel';

/**
 * RegistrationApi
 * 
 * The Presentation Plugin (React/REST/GraphQL) interacts ONLY with this class.
 * It serves as an Anti-Corruption Layer enforcing payload validation before
 * delegating to the Application Facade.
 */
export class RegistrationApi {
  constructor(private readonly facade: RegistrationFacade) {}

  async register(payload: any, context: ExecutionContext): Promise<RegistrationResponseDTO> {
    // 1. Validation (e.g. Zod parsing)
    if (!payload.studentId || !payload.academicTermId || !payload.registrationType) {
      throw new Error("Invalid Payload: Missing required registration fields");
    }

    const validatedDTO: RegistrationRequestDTO = {
      studentId: payload.studentId,
      academicTermId: payload.academicTermId,
      registrationType: payload.registrationType
    };

    // 2. Execution via Facade (Command Bus delegation)
    return await this.facade.register(validatedDTO, context);
  }

  // search, cancel, update would go here
}
