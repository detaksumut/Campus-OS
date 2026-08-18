# Registration Event Catalog

Dokumen ini mendefinisikan seluruh *Domain Events* yang diterbitkan oleh modul Registration (PMB). Setiap event menggunakan envelope standar `DomainEvent<TPayload>`.

| Event | Publisher | Subscriber | Version | Aggregate |
| :--- | :--- | :--- | :--- | :--- |
| **ApplicantCreated** | Registration | *None* (Internal) | 1.0.0 | Applicant |
| **ApplicantUpdated** | Registration | *None* (Internal) | 1.0.0 | Applicant |
| **ApplicantSubmitted** | Registration | Workflow | 1.0.0 | Applicant |
| **ApplicantWithdrawn** | Registration | Workflow, Academic | 1.0.0 | Applicant |
| **ApplicantDeleted** | Registration | Document | 1.0.0 | Applicant |
| **ApplicantVerificationStarted** | Registration | Workflow | 1.0.0 | Applicant |
| **ApplicantVerified** | Registration | Workflow, Notification | 1.0.0 | Applicant |
| **ApplicantVerificationRejected** | Registration | Notification | 1.0.0 | Applicant |
| **ApplicantVerificationCompleted** | Registration | Workflow | 1.0.0 | Applicant |
| **DocumentUploaded** | Registration | Document | 1.0.0 | Document |
| **DocumentValidated** | Registration | Workflow | 1.0.0 | Document |
| **DocumentRejected** | Registration | Notification | 1.0.0 | Document |
| **DocumentDeleted** | Registration | Document | 1.0.0 | Document |
| **SelectionScheduled** | Registration | Notification | 1.0.0 | RegistrationPeriod |
| **SelectionCompleted** | Registration | Workflow | 1.0.0 | RegistrationPeriod |
| **ApplicantAccepted** | Registration | Academic, Notification | 1.0.0 | Applicant |
| **ApplicantRejected** | Registration | Notification | 1.0.0 | Applicant |
| **WaitingListAssigned** | Registration | Notification | 1.0.0 | Applicant |
| **EnrollmentApproved** | Registration | Student, Academic | 1.0.0 | Applicant |
| **StudentRegistrationCompleted** | Registration | Academic | 1.0.0 | Applicant |
