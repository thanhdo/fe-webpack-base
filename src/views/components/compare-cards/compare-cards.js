const NUMBER_OF_SLIDE = 6;
const MAXIMUM_NUMBER_OF_CARD = 3;
const cardOptionsList = $('.compare-cards  .add-card-content');
const buttonAddCardCompare = $('.compare-cards .card-item-action');
const listCardItem = $('.compare-cards .add-card-content .credit-card-item');
const listCardAddedToCompare = $('.compare-cards .compare-cards__content .list-card-item');
let slickSlide;
let totalItemSelect = 0;

function apendCardToList(item) {
  const cardImage = $(item).find('img').attr('src');
  const cardName = $(item).find('p').text().trim();
  const dataIndex = $(item).attr('data-index');
  const cardApend = `<div class = 'col-md-4 card-item item-column' data-index = ${dataIndex}> \
  <span class = 'card-item__card-image-container'>\
  <img class = 'card-image' src = '${cardImage}'> \
  </span> \
  <p class = 'card-item__card-name'> ${cardName} </p> \
  <div class = 'card-item__rate'>
    <span class = 'star checked'></span>
    <span class = 'star checked'></span>
    <span class = 'star checked'></span>
    <span class = 'star'></span>
    <span class = 'star'></span>
  </div> \
  <span class = 'card-item__rate-count'>(9,974 Cardmember Rated)</span> \
  <div class = 'card-item__choice-action-button'>
    <button class = 'button-apply'>apply now</button>
    <button class = 'button-learn-more'>learn more</button>
  </div> \
  <span class = "card-item__remove-card-action">- Remove</span>`;
  listCardAddedToCompare.append(cardApend);
}

function removeButtonAddCard() {
  if (totalItemSelect === MAXIMUM_NUMBER_OF_CARD) {
    buttonAddCardCompare.addClass('remove');
    slickSlide.find('span.card-action').addClass('deactivated-by-count');
  } else {
    slickSlide.find('span.card-action').removeClass('deactivated-by-count');
  }
}
async function activeAllItemNotChosen(item) {
  totalItemSelect -= 1;
  slickSlide.each((index, element) => {
    $(element).find('.credit-card-item span').removeClass('deactivated-by-count');
  });
  const itemId = item.attr('data-index');
  console.log(itemId);

  // const itemId = item.attr('data-index');
  // addedCardList.find(item).remove();

  // let findItem = await findItemEqualsName(itemId);
  // findItem = $(findItem);
  // findItem.find('span').removeClass('deactivated-by-choice');
  // updateState();
}


function removeButtonHandler(event) {
  // INFO: for already selected item
  const itemClick = $(event.currentTarget).parents('item-column');
  activeAllItemNotChosen(itemClick);
}

function clickToAddItem() {
  listCardItem.each((index, item) => {
    $(item).find('span.card-action').click((event) => {
      const this$ = event.currentTarget;
      apendCardToList(item);
      totalItemSelect += 1;
      removeButtonAddCard();
      $(this$).addClass('deactivated-by-choice');

      $('.card-item__remove-card-action').off('click').on('click', removeButtonHandler);
    });
  });
}

const CompareCard = {
  init: async () => {
    const slick = await cardOptionsList.slick({
      slidesToShow: NUMBER_OF_SLIDE,
      slidesToScroll: NUMBER_OF_SLIDE,
    });
    slick.fadeOut();
    slickSlide = $('.compare-cards .add-card-content .slick-slide:not(.slick-cloned)');
    buttonAddCardCompare.find('.add-button').click(() => {
      cardOptionsList.fadeIn();
      const topPrimaryHeight = $('.top-primary').height();
      $('html, body').animate({ scrollTop: $('.compare-cards .add-card-content').offset().top - topPrimaryHeight }, 1000);
    });

    clickToAddItem();
  },
};
export default CompareCard;
