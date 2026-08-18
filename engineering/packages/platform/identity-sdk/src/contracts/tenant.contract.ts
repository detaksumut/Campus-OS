export interface Tenant {
  id: string;
  name: string;
  type: 'university' | 'faculty' | 'association' | 'chapter';
  status: 'active' | 'suspended';
}
