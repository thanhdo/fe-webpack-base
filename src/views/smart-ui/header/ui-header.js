const Header = {
  init: () => {
    $('.mobile-menu').click(() => {
      $('.navbar-primary').toggle('600');
    })
  },

  onWindowResize: () => {
    if ($('body').width() > 768) {
      $('.navbar-primary').css('display', 'flex')
    } else {
      $('.navbar-primary').css('display', 'none')
    }

  }
};
export default Header;
