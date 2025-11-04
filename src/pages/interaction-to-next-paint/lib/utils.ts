export const getINPRating = (value: number) => {
  if (value <= 200) {
    return 'good';
  }

  if (value <= 500) {
    return 'needs-improvement';
  }

  return 'poor';
};

export const getProgress = (value: number) => Math.min((value / 1000) * 100, 100);

export const formatTime = (timestamp: number | null) => {
  if (!timestamp) {
    return 'N/A';
  }

  const date = new Date(timestamp);

  return date.toLocaleTimeString();
};

export const getStatusColor = (isMeasuring: boolean, inp: number | null) => {
  if (isMeasuring) {
    return 'blue';
  }

  if (inp !== null) {
    return 'green';
  }

  return 'gray';
};

export const getStatusText = (isMeasuring: boolean, inp: number | null) => {
  if (isMeasuring) {
    return 'Listening';
  }

  if (inp !== null) {
    return 'Complete';
  }

  return 'Waiting';
};

export const getRatingColor = (rating: string | null) => {
  if (rating === 'good') {
    return 'green';
  }

  if (rating === 'needs-improvement') {
    return 'yellow';
  }

  return 'red';
};

export const getRatingText = (rating: string | null) => {
  if (rating === 'good') {
    return 'Good';
  }

  if (rating === 'needs-improvement') {
    return 'Needs Improvement';
  }

  return 'Poor';
};
