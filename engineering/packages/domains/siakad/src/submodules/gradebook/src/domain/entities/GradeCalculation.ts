import { GradeComponent } from './GradeComponent';
export class GradeCalculation {
  static calculateTotal(components: GradeComponent[]): number {
    return components.reduce((acc, curr) => acc + (curr.score * curr.weight), 0);
  }
}
