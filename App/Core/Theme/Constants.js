import { Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight as getStatusBarHelper } from 'react-native-iphone-x-helper';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const getDeviceStatusBar = () => {
  if (isIOS) {
    return getStatusBarHelper(true);
  }
  return StatusBar.currentHeight;
};

const getScreenHeight = () => {
  return Dimensions.get('screen').height;
};
const getScreenWidth = () => {
  return Dimensions.get('screen').width;
};

const getStatusBarHeight = () => {
  return getDeviceStatusBar();
};

const DESIGN_BASE_WIDTH = 811;

const DEVICE = {
  HEIGHT: getScreenHeight(),
  WIDTH: getScreenWidth(),
  STATUS_BAR_HEIGHT: getStatusBarHeight(),
};

const constants = {
  DEVICE,
  DESIGN_BASE_WIDTH,
};
export default constants;
