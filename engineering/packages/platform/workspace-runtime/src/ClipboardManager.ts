export class ClipboardManager {
  private clipboardData: any;

  async copy(data: any): Promise<void> {
    this.clipboardData = data;
  }

  async cut(data: any): Promise<void> {
    this.clipboardData = data;
  }

  async paste(): Promise<any> {
    return this.clipboardData;
  }
}
