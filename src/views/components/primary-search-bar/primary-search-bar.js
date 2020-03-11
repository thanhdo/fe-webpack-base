let slideIndex = 0;
const PrimarySearchBar = {
  init: () => {
    PrimarySearchBar.animateSlide();
    PrimarySearchBar.toggleMenuPrimary();
  },

  animateSlide: () => {
    if ($('.primary-search-bar')) {
      const dropdownItem = $('.primary-search-bar .primary-search-bar__content__dropdown__item');
      for (let i = 0; i < dropdownItem.length; i += 1) {
        $(dropdownItem[i]).removeClass('fadeInUpCustom');
      }
      slideIndex += 1;
      if (slideIndex > dropdownItem.length) { slideIndex = 1; }
      $(dropdownItem[slideIndex - 1]).addClass('fadeInUpCustom');
      setTimeout(PrimarySearchBar.animateSlide, 2000);
    }
  },

  toggleMenuPrimary: () => {
    if ($('.primary-search-bar')) {
      const primaryItem = $('.primary-search-bar');
      const primaryMenu = $('.primary-search-bar__menu');
      const primaryMenuContent = $('.primary-search-bar__menu__content');
      const iconArrow = $('.icon-arrow');
      $(document).mouseup((e) => {
        if (primaryItem.has(e.target).length && !primaryMenu.has(e.target).length) {
          primaryMenu.addClass('active');
          iconArrow.addClass('active');
          primaryMenuContent
            .removeClass('fadeOutDown')
            .addClass('fadeInUp');
        } else {
          primaryMenu.removeClass('active');
          iconArrow.removeClass('active');
          primaryMenuContent
            .removeClass('fadeInUp')
            .addClass('fadeOutDown');
        }
      });
    }
  },
};

export default PrimarySearchBar;
