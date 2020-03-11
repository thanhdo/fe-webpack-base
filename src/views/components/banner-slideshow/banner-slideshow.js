const SlideShow = {
  init: () => {
    $('.slideshow').slick({
      slidesToShow: 1,
      dots: true,
      // INFO: save for future use
      // autoplay: true,
      // autoplaySpeed: 1000,
    });
  },
};

export default SlideShow;
