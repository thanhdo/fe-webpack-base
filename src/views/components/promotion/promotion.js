const Promotion = {
  init: () => {
    $('.promotion-slide').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false,
      // INFO: save for future use
      autoplay: false,
      autoplaySpeed: 3000,
    });
  },
};
export default Promotion;
