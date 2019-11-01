import constants from './Constants';

export const toPX = (intOriginalScreenWidth = constants.DESIGN_BASE_WIDTH) => intPixels => {
  return (
    ((constants.DEVICE.WIDTH < constants.DEVICE.HEIGHT
      ? constants.DEVICE.WIDTH
      : constants.DEVICE.HEIGHT) /
      intOriginalScreenWidth) *
    intPixels
  );
};

export const toBaseDesignPx = toPX();
