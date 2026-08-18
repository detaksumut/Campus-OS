# Registration State Machine

## 1. Semester Registration Lifecycle
Menggambarkan transisi status dari proses pendaftaran semester.

\`\`\`mermaid
stateDiagram-v2
    [*] --> Draft : Create Registration
    Draft --> Submitted : Submit
    Submitted --> EligibilityChecking : Start Workflow
    
    EligibilityChecking --> WaitingPayment : Eligible
    EligibilityChecking --> Cancelled : Not Eligible (Academic/Discipline Issue)
    
    WaitingPayment --> WaitingValidation : Payment Received (Integration Event)
    WaitingPayment --> Cancelled : Payment Deadline Expired
    
    WaitingValidation --> Registered : Auto/Manual Validated
    WaitingValidation --> WaitingPayment : Invalid Payment
    
    Registered --> Completed : End of Registration Period
    
    Cancelled --> [*]
    Completed --> [*]
\`\`\`

## 2. Student Academic Status Lifecycle
Menggambarkan status akademik mahasiswa secara berkesinambungan. Status ini diperbarui setelah periode registrasi ditutup (Completed).

\`\`\`mermaid
stateDiagram-v2
    [*] --> Active : Provisioned & Registered
    
    Active --> Active : Re-Registered next semester
    Active --> Leave : Requested Leave (Cuti)
    Active --> Suspended : Discipline Action
    Active --> DropOut : Academic Failure / Max Tenure
    Active --> Graduated : Passed Yudisium
    Active --> Inactive : Failed to Register (No Leave)
    
    Leave --> Active : Reactivation Registered
    Leave --> DropOut : Max Leave Exceeded
    
    Suspended --> Active : Suspension Lifted
    Suspended --> DropOut : Further Action
    
    Inactive --> Active : Reactivation Registered
    Inactive --> DropOut : Max Inactive Exceeded
    
    DropOut --> [*]
    Graduated --> [*]
\`\`\`
