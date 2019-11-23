/* eslint-disable import/prefer-default-export */
export const toUpperCaseFirsLetter = str => {
  const ignore = ['i', 'ii', 'iii', 'iv'];
  return str
    .toLowerCase()
    .split(' ')
    .map(s => (ignore.includes(s) ? s.toUpperCase() : s.charAt(0).toUpperCase() + s.substring(1)))
    .join(' ');
};
