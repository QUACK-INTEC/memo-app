import { toBaseDesignPx } from './Pixels';

export const SPACER_BASE = 16;

export const SPACER_UNITS = {
  /**  0 - 0  */ ZERO: 0,
  /**  1 - 4  */ ONE_4: SPACER_BASE * 0.25,
  /**  2 - 8  */ TWO_8: SPACER_BASE * 0.5,
  /**  3 - 16 */ THREE_16: SPACER_BASE,
  /**  4 - 24 */ FOUR_24: SPACER_BASE * 1.5,
  /**  5 - 32 */ FIVE_32: SPACER_BASE * 2,
  /**  6 - 48 */ SIX_48: SPACER_BASE * 3,
  /**  7 - 20 */ SEVEN_20: SPACER_BASE * 1.25,
  /**  8 - 12 */ EIGHT_12: SPACER_BASE * 0.75,
  /**  9 - 6  */ NINE_6: SPACER_BASE * 0.375,
  /** 10 - 28 */ TEN_28: SPACER_BASE * 1.75,
  /** 11 - 40 */ ELEVEN_40: SPACER_BASE * 2.5,
  /** 12 - 44 */ TWELVE_44: SPACER_BASE * 2.75,
  /** 13 - 18 */ THIRTEEN_18: SPACER_BASE * 1.125,
  /** 14 - 10 */ FOURTEEN_10: SPACER_BASE * 0.625,
  /** 15 - 60 */ FIFTEEN_60: SPACER_BASE * 3.75,
  /** 16 - 34 */ SIXTEEN_34: SPACER_BASE * 2.125,
};

const spacers = Object.values(SPACER_UNITS).map((unit, index) => ({
  [`W_${index}`]: {
    width: toBaseDesignPx(unit),
  },
  [`H_${index}`]: {
    height: toBaseDesignPx(unit),
  },
  [`MA_${index}`]: {
    margin: toBaseDesignPx(unit),
  },
  [`MB_${index}`]: {
    marginBottom: toBaseDesignPx(unit),
  },
  [`ME_${index}`]: {
    marginEnd: toBaseDesignPx(unit),
  },
  [`MH_${index}`]: {
    marginHorizontal: toBaseDesignPx(unit),
  },
  [`ML_${index}`]: {
    marginLeft: toBaseDesignPx(unit),
  },
  [`MR_${index}`]: {
    marginRight: toBaseDesignPx(unit),
  },
  [`MS_${index}`]: {
    marginStart: toBaseDesignPx(unit),
  },
  [`MT_${index}`]: {
    marginTop: toBaseDesignPx(unit),
  },
  [`MV_${index}`]: {
    marginVertical: toBaseDesignPx(unit),
  },
  [`PA_${index}`]: {
    padding: toBaseDesignPx(unit),
  },
  [`PB_${index}`]: {
    paddingBottom: toBaseDesignPx(unit),
  },
  [`PE_${index}`]: {
    paddingEnd: toBaseDesignPx(unit),
  },
  [`PH_${index}`]: {
    paddingHorizontal: toBaseDesignPx(unit),
  },
  [`PL_${index}`]: {
    paddingLeft: toBaseDesignPx(unit),
  },
  [`PR_${index}`]: {
    paddingRight: toBaseDesignPx(unit),
  },
  [`PS_${index}`]: {
    paddingStart: toBaseDesignPx(unit),
  },
  [`PT_${index}`]: {
    paddingTop: toBaseDesignPx(unit),
  },
  [`PV_${index}`]: {
    paddingVertical: toBaseDesignPx(unit),
  },
}));

export default spacers.reduce((acc, current) => ({ ...acc, ...current }));
