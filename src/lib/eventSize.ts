export type EventSize = 'small' | 'medium' | 'large';

export function getEventSize(maxParticipants: number): EventSize {
  if (maxParticipants >= 2 && maxParticipants <= 4) {
    return 'small';
  } else if (maxParticipants >= 5 && maxParticipants <= 9) {
    return 'medium';
  } else if (maxParticipants >= 10 && maxParticipants <= 19) {
    return 'large';
  } else {
    throw new Error('Max participants out of supported range (2-19)');
  }
}