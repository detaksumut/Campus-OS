export class ProfileRuntime {
  async getProfile(userId: string) {
    return {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com'
    };
  }
}
