import Util from '../util';

const STICKY_STOP_POINT = 46;
const MOBILE_BREAKPOINT = 768;
const Header = {
  init: () => {
    $('.mobile-menu').click(() => {
      $('.navbar-primary').toggle('600');
    });

    $('.mobile-menu').click(() => {
      $('.mobile-menu').toggleClass('hamburger-hover');
    });

    Header._initStickyHeader();
  },

  onWindowResize: () => {
    if ($('body').width() > MOBILE_BREAKPOINT) {
      $('.navbar-primary').css('display', 'flex');
    } else {
      $('.navbar-primary').css('display', 'none');
    }
  },

  _initStickyHeader: () => {
    const $sticky = $('.top-primary');
    $(window).scroll(() => {
      const windowTop = $(window).scrollTop();

      if (STICKY_STOP_POINT < windowTop) {
        if (Util.detechIE()) {
          $sticky.css({ position: 'fixed', top: 0, width: '100%' }).addClass('sticked');
        } else {
          $sticky.css({ position: 'sticky', top: 0 }).addClass('sticked');
        }
      } else {
        $sticky.css({ position: 'relative' }).removeClass('sticked');
      }
    });
    $(window).scroll();
  },
};
export default Header;
