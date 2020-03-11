import Global from './views/components/global/global';
import Header from './views/components/header/header';
import Language from './views/components/language/language';
import SlideShow from './views/components/banner-slideshow/banner-slideshow';
import PrimarySearchBar from './views/components/primary-search-bar/primary-search-bar';
import Bootstrap from './views/bootstrap/src/index';
import MoreFromVpbank from './views/components/more-from-vpbank/more-from-vpbank';
import Promotion from './views/components/promotion/promotion';
import AddCard from './views/components/add-card/add-card';
import CardDetailContent from './views/components-card/card-detail-content/card-detail-content';
// import AddCard from './views/components-card/add-card/add-card';
import NavTab from './views/components/nav-tab/nav-tab';
import CardList from './views/components/card-list/card-list';
import CompareCard from './views/components/compare-cards/compare-cards';
import Testimony from './views/components/testimony/testimony';

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
  AddCard.init();
  CardList.init();
  CompareCard.init();
  CardDetailContent.init();
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
  PrimarySearchBar.init();
  MoreFromVpbank.init();
  Promotion.init();
  NavTab.init();
  Testimony.init();
});
