export interface IFinancialClearanceProvider {
    /**
     * Checks if a student has financial clearance for a specific term.
     * The exact rules (UKT payment, installment, scholarship, etc) are internal to Finance.
     */
    isCleared(studentId: string, academicTermId: string): Promise<boolean>;
}
