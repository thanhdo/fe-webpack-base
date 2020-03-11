const storyTipsSlide = $('.more-from-vpbank  .more-from-vpbank__content .story-tips-slick');
const listNewItemSlide = $('.more-from-vpbank .more-from-vpbank__content--news .awards');
const MoreFromVpbank = {
  init: () => {
    storyTipsSlide.slick({
      slidesToShow: 1,
      dots: true,
    });
    listNewItemSlide.slick({
      slidesToShow: 1,
      dots: true,
    });
  },
};

export default MoreFromVpbank;
