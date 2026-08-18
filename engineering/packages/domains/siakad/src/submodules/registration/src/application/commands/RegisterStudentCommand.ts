import { ICommand } from '../../../../../../../application-kernel/src/core/Kernel';
import { RegistrationRequestDTO } from '../dto/RegistrationRequestDTO';

export class RegisterStudentCommand implements ICommand {
  constructor(public readonly payload: RegistrationRequestDTO) {}
}
