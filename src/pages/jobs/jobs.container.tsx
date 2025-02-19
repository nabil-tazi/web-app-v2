import { isTouchDevice } from 'src/core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const JobsContainer = () => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
