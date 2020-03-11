const CardDetailContent = {
  init: () => {
    CardDetailContent.smoothScroll();
    CardDetailContent.enableCollapse();
  },
  enableCollapse: () => {
    const w = window.innerWidth;
    const SectionCardDetailItem = $('.card-detail-content__body__item');
    const CollapseItemLeftLink = $('.card-detail-content__body__item__left h1 a');
    const CollapseItemRight = $('.card-detail-content__body__item__right');
    if (SectionCardDetailItem.length) {
      if (w < 768) {
        CollapseItemRight.removeClass('show');
        CollapseItemLeftLink.addClass('collapsed');
      }
    }
  },
  smoothScroll: () => {
    const SectionCardDetail = $('.card-detail-content');
    if (SectionCardDetail.length) {
      $('.card-detail-content__head__list a[href^="#"]').on('click', (event) => {
        const $this = $(event.currentTarget);
        const $target = $($this.attr('href'));
        const topPrimaryHeight = $('.top-primary').height();
        $('.card-detail-content__head__list a').removeClass('active');
        $this.addClass('active');
        if ($target.length) {
          event.preventDefault();
          $('html, body').stop().animate({
            scrollTop: $target.offset().top - topPrimaryHeight,
          }, 1000);
        }
      });
    }
  },
};

export default CardDetailContent;
