const $navTabLink = $('.nav-tab .nav-tab__link a');
const $navTabContent = $('.nav-tab .nav-tab__content ');
const NavTab = {
  init: () => {
    $navTabLink.click((event) => {
      const $this = $(event.target);
      const chosenTab = $this.attr('data-link');
      $navTabLink.removeClass('active');
      $this.addClass('active');
      $navTabContent.find('.tab-pane')
        .removeClass('active fadeInUp')
      $navTabContent.find(`.${chosenTab}`)
        .addClass('active fadeInUp')
    });
  },
};

export default NavTab;
