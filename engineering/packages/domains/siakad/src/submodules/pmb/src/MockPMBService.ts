import { AdmissionApplication, AdmissionPeriod } from './IPMBEntities';

export class MockPMBService {
  public async getActivePeriods(): Promise<AdmissionPeriod[]> {
    return [
      {
        periodId: 'per_1',
        name: 'Penerimaan Mahasiswa Baru 2027/2028',
        startDate: '2027-01-01T00:00:00Z',
        endDate: '2027-08-31T23:59:59Z',
        isActive: true,
        paths: [
          {
            pathId: 'path_1',
            periodId: 'per_1',
            code: 'SNBP',
            name: 'Seleksi Nasional Berdasarkan Prestasi',
            selectionType: 'PRESTASI',
            requirements: ['Rapor Semester 1-5', 'Sertifikat Prestasi'],
            quota: 1200,
            feeEstimation: 0,
            isActive: true
          },
          {
            pathId: 'path_2',
            periodId: 'per_1',
            code: 'MANDIRI',
            name: 'Seleksi Mandiri Universitas',
            selectionType: 'MANDIRI',
            requirements: ['Ijazah', 'Tes Tulis'],
            quota: 2500,
            feeEstimation: 350000,
            isActive: true
          }
        ]
      }
    ];
  }

  public async getRecentApplications(): Promise<AdmissionApplication[]> {
    return [
      {
        applicationId: 'app_1001',
        applicantId: 'usr_9001',
        pathId: 'path_2',
        registrationDate: '2027-02-15T10:30:00Z',
        status: 'SUBMITTED',
        paymentStatus: 'PAID', // Updated via Finance Integration Event
        applicant: {
          applicantId: 'usr_9001',
          nationalId: '3271234567890001',
          fullName: 'Budi Santoso',
          email: 'budi@example.com',
          phone: '081234567890',
          dateOfBirth: '2009-05-14T00:00:00Z',
          previousSchool: 'SMA Negeri 1 Jakarta'
        },
        choices: [
          { choiceId: 'ch_1', applicationId: 'app_1001', studyProgramId: 'prog_if', priority: 1, status: 'PENDING' }
        ],
        documents: []
      }
    ];
  }
}

export const pmbService = new MockPMBService();
