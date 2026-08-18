import { ICommand } from '@campus-os/application-kernel';
import { RegistrationRequestDTO } from '../dto/RegistrationRequestDTO';

export class RegisterStudentCommand implements ICommand {
  constructor(public readonly payload: RegistrationRequestDTO) {}
}
