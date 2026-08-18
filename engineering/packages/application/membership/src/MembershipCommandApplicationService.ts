import { ICommandHandler, ICommand } from '@campus-os/application-kernel';
// Assume EnrollmentRuntime and DTOs from @campus-os/membership SDK
// import { EnrollmentRuntime, EnrollmentCommand } from '@campus-os/membership';

export interface EnrollMemberCommand extends ICommand {
  commandId: 'capability.membership.enroll';
  payload: {
    fullName: string;
    email: string;
    institution: string;
  };
}

export class MembershipCommandApplicationService implements ICommandHandler<EnrollMemberCommand, any> {
  // constructor(private enrollmentRuntime: EnrollmentRuntime) {}

  public async handle(command: EnrollMemberCommand): Promise<any> {
    console.log(`[MembershipCommandService] Handling ${command.commandId}`);
    
    // 1. DTO Mapping
    const sdkCommand = {
      name: command.payload.fullName,
      contactEmail: command.payload.email,
      institutionId: command.payload.institution
    };

    // 2. Call Business Runtime (Mocked for scaffold)
    // const result = await this.enrollmentRuntime.enroll(sdkCommand);
    const result = { success: true, memberId: 'MEM-' + Date.now() };

    // 3. Return mapped result
    return result;
  }
}
