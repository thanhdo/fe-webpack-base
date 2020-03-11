const MAXIMUM_NUMBER_OF_CARD = 3;
const NUMBER_OF_SLIDE = 6;
const listCardReal = [];
let chosenCreditCard = 0;
const buttonCompare = $('.add-card-component .compare-button .general-button');
const addedCardList = $('.add-card-component .row.list-card-added');

const cardOptionsList = $('.add-card-component .add-card-content');

function appendItemToListCompare(cardImage, cardName, cardIndex) {
  let contentCredit = `<div class = 'col-md-3 item-column' data-index='${cardIndex}'> \
    <div class = 'item'> \
    <div class = 'card-image'> \
    <img src = ${cardImage} alt = "" /> \
    </div><div class = 'card-infomation'><span class = 'name'>${cardName}</span>`;
  contentCredit += '<br><span class = "card-action remove-action">+ Remove</span></div></div></div>';
  return contentCredit;
}

function findItemEqualsName(id) {
  return listCardReal.find(x => $(x).find('.credit-card-item').attr('data-index') === id);
}

function checkToDeactiveCardOption() {
  // INFO: Deactive all button 'Add' on list credit card
  if (chosenCreditCard === MAXIMUM_NUMBER_OF_CARD) {
    listCardReal.forEach((e) => {
      $(e).find('.credit-card-item').find('span').addClass('deactivated-by-count');
    });
  }
}

function checkCompareButtonState() {
  // INFO: Toggle class for button COMPARE
  if (chosenCreditCard < MAXIMUM_NUMBER_OF_CARD - 1) {
    buttonCompare.addClass('deactivated');
  } else {
    buttonCompare.removeClass('deactivated');
    checkToDeactiveCardOption();
  }
}

function setCompareButtonContent() {
  buttonCompare.text(`COMPARE NOW (${chosenCreditCard})`);
}

function updateState() {
  checkCompareButtonState();
  setCompareButtonContent();
}

async function activeAllItemNotChosen(item) {
  chosenCreditCard -= 1;
  listCardReal.forEach((e) => {
    $(e).find('.credit-card-item span').removeClass('deactivated-by-count');
  });
  const itemId = item.attr('data-index');
  addedCardList.find(item).remove();

  let findItem = await findItemEqualsName(itemId);
  findItem = $(findItem);
  findItem.find('span').removeClass('deactivated-by-choice');
  updateState();
}

function removeButtonHandler(event) {
  // INFO: for already selected item
  const itemClick = $(event.currentTarget).parents('.item-column');
  activeAllItemNotChosen(itemClick);
}

const AddCard = {
  init: () => {
    updateState();
    // INFO: init slick element
    cardOptionsList.slick({
      slidesToShow: NUMBER_OF_SLIDE,
      slidesToScroll: NUMBER_OF_SLIDE,
    });

    const slickSlide = $('.add-card-component .slick-slide:not(.slick-cloned)');
    // INFO: get real card from slick
    slickSlide.each((index, element) => {
      listCardReal.push(element);
    });
    // INFO: add select event handler for card options
    listCardReal.forEach((element) => {
      const item = $(element).find('.credit-card-item');
      const cardImage = item.find('.card-image img').attr('src');
      const cardName = item.find('.card-name').text();
      const cardIndex = item.attr('data-index');
      item.find('.card-action').click((event) => {
        const $this = $(event.currentTarget);
        $this.addClass('deactivated-by-choice');
        addedCardList.append(appendItemToListCompare(cardImage, cardName, cardIndex));
        chosenCreditCard += 1;
        updateState();
        $('.add-card-component .remove-action').off('click').on('click', removeButtonHandler);
      });
    });
    $('.add-card-component .remove-action').on('click', removeButtonHandler);
  },
};

export default AddCard;
