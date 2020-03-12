import Global from './views/components/global/global';
import Header from './views/components/header/header';
import Language from './views/components/language/language';
import SlideShow from './views/components/banner-slideshow/banner-slideshow';
import NavTab from './views/components/nav-tab/nav-tab';
import Bootstrap from './views/bootstrap/src/index';

require('slick-carousel/slick/slick.js');
require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');


$(() => {
  // Code here
});

$(document).ready(() => {
  // INFO: lazyload image
  Global.lazyLoad();
  Header.init();
  Language.init();
});

$(window).on('resize', () => {
  // TODO: use throttling instead of this
  setTimeout(() => {
    // INFO: lazyload image
    Global.lazyLoad();
    Header.onWindowResize();
    CardDetailContent.init();
  }, 0);
});

window.addEventListener('load', () => {
  $('body').css('visibility', 'visible');
  SlideShow.init();
  NavTab.init();
});
