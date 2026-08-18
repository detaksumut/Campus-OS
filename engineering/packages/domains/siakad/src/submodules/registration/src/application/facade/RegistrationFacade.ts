import { Mediator, ExecutionContext } from '../../../../../../../application-kernel/src/core/Kernel';
import { RegisterStudentCommand } from '../commands/RegisterStudentCommand';
import { RegistrationRequestDTO, RegistrationResponseDTO } from '../dto/RegistrationDTO';

export class RegistrationFacade {
  constructor(private readonly mediator: Mediator) {}

  async register(payload: RegistrationRequestDTO, context: ExecutionContext): Promise<RegistrationResponseDTO> {
    const command = new RegisterStudentCommand(payload);
    return await this.mediator.commandBus.execute(command, context);
  }

  // search, update, cancel would go here delegating to queries and commands
}
