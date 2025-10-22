import type { LcpRating } from '../lib';

export interface LcpMetric {
  element?: string;
  rating: LcpRating;
  value: number;
}
