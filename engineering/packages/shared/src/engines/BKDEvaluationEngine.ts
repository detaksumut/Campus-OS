/**
 * BKD Evaluation Engine
 * Standar Beban Kerja Dosen (BKD 12 - 16 SKS) SISTER Kemendikbudristek RI
 * Tridharma Perguruan Tinggi: Pendidikan, Penelitian, Pengabdian, Penunjang
 */

export interface BKDSKSBreakdown {
  educationCredits: number;    // Bidang Pengajaran (Min 4 - 8 SKS)
  researchCredits: number;     // Bidang Penelitian (Min 2 SKS)
  communityCredits: number;    // Bidang Pengabdian (Min 0.5 - 1 SKS)
  supportingCredits: number;   // Bidang Penunjang
}

export class BKDEvaluationEngine {
  static evaluateBKD(breakdown: BKDSKSBreakdown): { 
    totalCredits: number; 
    status: 'MEMENUHI' | 'TIDAK_MEMENUHI'; 
    details: string[] 
  } {
    const total = 
      breakdown.educationCredits + 
      breakdown.researchCredits + 
      breakdown.communityCredits + 
      breakdown.supportingCredits;

    const details: string[] = [];

    if (breakdown.educationCredits < 4) {
      details.push('Bidang Pendidikan/Pengajaran kurang dari batas minimum (4 SKS).');
    }
    if (breakdown.researchCredits < 1) {
      details.push('Bidang Penelitian kurang dari batas minimum (1 SKS).');
    }
    if (breakdown.communityCredits < 0.5) {
      details.push('Bidang Pengabdian kepada Masyarakat kurang dari batas minimum (0.5 SKS).');
    }
    if (total < 12.00) {
      details.push(`Total beban (${total.toFixed(2)} SKS) di bawah batas minimal regulasi (12.00 SKS).`);
    }
    if (total > 16.00) {
      details.push(`Total beban (${total.toFixed(2)} SKS) melebihi batas maksimal regulasi (16.00 SKS).`);
    }

    const isMemenuhi = details.length === 0;

    return {
      totalCredits: Math.round(total * 100) / 100,
      status: isMemenuhi ? 'MEMENUHI' : 'TIDAK_MEMENUHI',
      details: isMemenuhi ? ['Seluruh syarat Tridharma dan batas beban kerja 12-16 SKS terpenuhi.'] : details
    };
  }
}
