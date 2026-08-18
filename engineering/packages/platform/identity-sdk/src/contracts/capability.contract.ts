export interface Capability {
  id: string; // e.g. "publication.review.submit"
  name: string; // e.g. "Submit Review"
  module: string; // e.g. "publication"
  category: string; // e.g. "review"
  description: string;
  system: boolean;
}
