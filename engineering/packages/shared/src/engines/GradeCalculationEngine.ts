/**
 * Grade Calculation Engine
 * Standar Penilaian SN-Dikti Kemendikbudristek RI
 * Konversi Nilai Angka (0-100) ➔ Huruf (A-E) ➔ Bobot (0.00-4.00) & Mutasi IPK/IPS
 */

export interface GradeItem {
  attendanceScore: number; // Bobot presensi (10%)
  assignmentScore: number; // Bobot tugas (20%)
  quizScore: number;       // Bobot kuis (10%)
  midtermScore: number;    // Bobot UTS (30%)
  finalScore: number;      // Bobot UAS (30%)
  credits: number;         // SKS Mata Kuliah
}

export interface GradeResult {
  numericScore: number;
  letterGrade: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E';
  gradePoint: number;
  isPassed: boolean;
}

export class GradeCalculationEngine {
  static computeNumericScore(item: GradeItem): number {
    const total = 
      (item.attendanceScore * 0.10) +
      (item.assignmentScore * 0.20) +
      (item.quizScore * 0.10) +
      (item.midtermScore * 0.30) +
      (item.finalScore * 0.30);
    return Math.round(total * 100) / 100;
  }

  static convertToGrade(numericScore: number): GradeResult {
    if (numericScore >= 85) return { numericScore, letterGrade: 'A', gradePoint: 4.00, isPassed: true };
    if (numericScore >= 80) return { numericScore, letterGrade: 'A-', gradePoint: 3.75, isPassed: true };
    if (numericScore >= 75) return { numericScore, letterGrade: 'B+', gradePoint: 3.50, isPassed: true };
    if (numericScore >= 70) return { numericScore, letterGrade: 'B', gradePoint: 3.00, isPassed: true };
    if (numericScore >= 65) return { numericScore, letterGrade: 'B-', gradePoint: 2.75, isPassed: true };
    if (numericScore >= 60) return { numericScore, letterGrade: 'C+', gradePoint: 2.25, isPassed: true };
    if (numericScore >= 55) return { numericScore, letterGrade: 'C', gradePoint: 2.00, isPassed: true };
    if (numericScore >= 40) return { numericScore, letterGrade: 'D', gradePoint: 1.00, isPassed: false };
    return { numericScore, letterGrade: 'E', gradePoint: 0.00, isPassed: false };
  }

  static calculateSemesterGPA(courseGrades: { credits: number; gradePoint: number }[]): { gpa: number; totalCredits: number } {
    if (!courseGrades.length) return { gpa: 0, totalCredits: 0 };
    
    let totalPoints = 0;
    let totalCredits = 0;

    for (const c of courseGrades) {
      totalPoints += c.credits * c.gradePoint;
      totalCredits += c.credits;
    }

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return {
      gpa: Math.round(gpa * 100) / 100,
      totalCredits
    };
  }
}
