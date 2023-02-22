export const deviceSizes = {
  mobile: 540,
  tablet: 580,
  laptop: 1024,
};

export default {
  device: {
    mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
    tablet: `screen and (max-width: ${deviceSizes.tablet}px)`,
    laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
  }
};
