import { LCP_RATINGS, RATING_TO_COLOR, RATING_TO_ICON } from '../model';

export type LcpRating = (typeof LCP_RATINGS)[number];

const isLcpRating = (value: string): value is LcpRating =>
  (LCP_RATINGS as readonly string[]).includes(value);

export const getRatingColor = (rating: string) => {
  if (!isLcpRating(rating)) return 'gray';

  return RATING_TO_COLOR[rating];
};

export const getRatingIcon = (rating: string) => {
  if (!isLcpRating(rating)) return null;

  return RATING_TO_ICON[rating];
};

export const getRatingMessage = (rating: string) => {
  if (!isLcpRating(rating)) return '';

  switch (rating) {
    case 'good': {
      return 'Excellent! Your LCP is within the recommended threshold.';
    }

    case 'needs-improvement': {
      return 'LCP needs improvement. Consider optimizing your largest content element.';
    }

    case 'poor': {
      return 'Poor LCP performance. Significant optimization is needed.';
    }

    default: {
      throw new Error(`Invalid LCP rating: ${rating}`);
    }
  }
};
