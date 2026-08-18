export class GetConferenceDetailsQuery {
  constructor(public readonly conferenceId: string) {}
}

export class ListPendingPapersQuery {
  constructor(public readonly conferenceId: string) {}
}

export class GetConferenceScheduleQuery {
  constructor(public readonly conferenceId: string) {}
}
