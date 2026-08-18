/**
 * KRS SKS Limit Engine
 * Standar SN-Dikti Kemendikbudristek RI
 * Menghitung batas beban studi semester berdasarkan Indeks Prestasi Semester (IPS) lalu.
 */

export interface SKSLimitRule {
  minIPS: number;
  maxIPS: number;
  maxCredits: number;
  predicate: string;
}

export class KRSSKSLimitEngine {
  private static rules: SKSLimitRule[] = [
    { minIPS: 3.00, maxIPS: 4.00, maxCredits: 24, predicate: 'Sangat Baik (Maks 24 SKS)' },
    { minIPS: 2.50, maxIPS: 2.99, maxCredits: 21, predicate: 'Baik (Maks 21 SKS)' },
    { minIPS: 2.00, maxIPS: 2.49, maxCredits: 18, predicate: 'Cukup (Maks 18 SKS)' },
    { minIPS: 1.50, maxIPS: 1.99, maxCredits: 15, predicate: 'Kurang (Maks 15 SKS)' },
    { minIPS: 0.00, maxIPS: 1.49, maxCredits: 12, predicate: 'Perlu Bimbingan Khusus (Maks 12 SKS)' }
  ];

  static calculateMaxCredits(previousSemesterIPS: number, isFirstSemester: boolean = false): { maxCredits: number; predicate: string } {
    if (isFirstSemester) {
      // Semester 1 paket standar 20 SKS
      return { maxCredits: 20, predicate: 'Paket Semester 1 Baru (20 SKS)' };
    }

    const clampedIPS = Math.min(4.00, Math.max(0.00, previousSemesterIPS));
    const matchedRule = this.rules.find(r => clampedIPS >= r.minIPS && clampedIPS <= r.maxIPS);

    return {
      maxCredits: matchedRule ? matchedRule.maxCredits : 18,
      predicate: matchedRule ? matchedRule.predicate : 'Standar (18 SKS)'
    };
  }

  static validateKRSSelection(previousIPS: number, requestedCredits: number): { isValid: boolean; message: string; allowedMax: number } {
    const { maxCredits } = this.calculateMaxCredits(previousIPS);
    if (requestedCredits > maxCredits) {
      return {
        isValid: false,
        message: `Beban studi yang diambil (${requestedCredits} SKS) melebihi batas maksimal regulasi Kemendikbudristek (${maxCredits} SKS) berdasarkan IPS semester lalu (${previousIPS.toFixed(2)}).`,
        allowedMax: maxCredits
      };
    }
    return {
      isValid: true,
      message: `Beban studi valid (${requestedCredits}/${maxCredits} SKS).`,
      allowedMax: maxCredits
    };
  }
}
