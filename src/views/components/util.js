const Util = {
  detechIE: () => {
    return (navigator.userAgent.indexOf('MSIE') !== -1
    || navigator.appVersion.indexOf('Trident/') > -1);
  },
};

export default Util;
