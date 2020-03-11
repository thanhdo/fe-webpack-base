const MAXIMUM_NUMBER_OF_CARD = 3;
const CARD_ITEM_PER_PAGE = 6;
let chosenCreditCard = 0;
let dataIndexCreditChoice = [];
let pageNow = 1;
let processedCardItem = [];
const tempCardItem = $('.card-list .card-list__list-item .card-item');
const listButtonFilter = $('.card-list .card-list__filter .choice-button');
const buttonCompare = $('.card-list .card-list__button-compare-card');
const pagination = $('.card-list .card-list__pagination');
let totalPage = Math.floor(tempCardItem.length / CARD_ITEM_PER_PAGE);

function renderPage() {
  let pageContent = '<a href = "" class = "prev-item"> &laquo;</a>';
  for (let i = 0; i < totalPage; i += 1) {
    if (i === 0) {
      pageContent += `<a href = "" class = "active" data-index = ${i + 1}>${i + 1}</a>`;
    } else {
      pageContent += `<a href = "" data-index = ${i + 1}>${i + 1}</a>`;
    }
  }
  pageContent += '<a href = "" class = "next-item"> &raquo;</a>';
  pagination.empty().append(pageContent);
}

function setCompareButtonContent() {
  buttonCompare.text(`COMPARE NOW (${chosenCreditCard})`);
}

function checkToDeactiveCardCheckboxOption(processedCardItem) {
  console.log(chosenCreditCard,dataIndexCreditChoice);
  if (chosenCreditCard === MAXIMUM_NUMBER_OF_CARD) {
    processedCardItem.each((index, element) => {
      $(element).find('input[type="checkbox"]').addClass('deactivated-by-count');
      if (dataIndexCreditChoice.includes($(element).attr('data-index'))) {
        $(element).find('input[type="checkbox"]').removeClass('deactivated-by-count');
      }
    });
  } else {
    processedCardItem.each((index, element) => {
      $(element).find('input[type="checkbox"]').removeClass('deactivated-by-count');
    });
  }
}

function actionWhenChangeCheckbox(checkboxAddCompare, processedCardItem) {
  checkboxAddCompare.change((input) => {
    const input$ = input.currentTarget;
    const dataIndexParent = $(input$).parents('.card-item').attr('data-index');
    if ($(input$).is(':checked')) {
      chosenCreditCard += 1;
      dataIndexCreditChoice.push(dataIndexParent);
    } else {
      chosenCreditCard -= 1;
      dataIndexCreditChoice = dataIndexCreditChoice.filter(x => x !== dataIndexParent);
    }
    if (chosenCreditCard < MAXIMUM_NUMBER_OF_CARD - 1) {
      buttonCompare.addClass('deactivated');
    } else {
      buttonCompare.removeClass('deactivated');
    }
    checkToDeactiveCardCheckboxOption(processedCardItem);
    setCompareButtonContent();
  });
}

function actionButtonPrevOrNextPage(prevPage, nextPage) {
  if (Number(pageNow) === 1 || totalPage === 1) {
    $(prevPage).css({ 'pointer-events': 'none', opacity: '0.5' });
  } else {
    $(prevPage).css({ 'pointer-events': 'initial', opacity: 'initial' });
  }
  if (Number(pageNow) === totalPage || totalPage === 1) {
    $(nextPage).css({ 'pointer-events': 'none', opacity: '0.5' });
  } else {
    $(nextPage).css({ 'pointer-events': 'initial', opacity: 'initial' });
  }
}

function renderItemOfPage() {
  const page = processedCardItem.slice((pageNow - 1) * 6, (pageNow - 1) * 6 + 6);
  $('.card-list__list-item-display').empty().append(page);
}

function renderItemOfPageFilter(cardFilter) {
  const page = cardFilter.slice((pageNow - 1) * 6, (pageNow - 1) * 6 + 6);
  $('.card-list__list-item-display').empty().append(page);
}

function onClickToPagination(paginationItem, event) {
  event.preventDefault();
  const paginationPage = event.currentTarget;
  if (!$(paginationPage).hasClass('prev-item') && !$(paginationPage).hasClass('next-item')) {
    paginationItem.each((index, element) => {
      $(element).removeClass('active');
    });
    $(paginationPage).addClass('active');
    pageNow = Number($(paginationPage).attr('data-index'));
  } else if ($(paginationPage).hasClass('prev-item')) {
    pageNow -= 1;
    paginationItem.each((index, element) => {
      if (Number($(element).attr('data-index')) === pageNow) {
        $(element).addClass('active');
      } else {
        $(element).removeClass('active');
      }
    });
  } else {
    pageNow += 1;
    paginationItem.each((index, element) => {
      if (Number($(element).attr('data-index')) === pageNow) {
        $(element).addClass('active');
      } else {
        $(element).removeClass('active');
      }
    });
  }
}

function clearState() {
  chosenCreditCard = 0;
  dataIndexCreditChoice = [];
  setCompareButtonContent();
  processedCardItem.each((index, element) => {
    $(element).find('input[type="checkbox"]').removeClass('deactivated-by-count');
    $(element).find('input[type="checkbox"]').prop('checked', false);
  });
}

const CardList = {
  init: () => {
    renderPage();
    // TODO : refactor
    if (chosenCreditCard < MAXIMUM_NUMBER_OF_CARD - 1) {
      buttonCompare.addClass('deactivated');
    } else {
      buttonCompare.removeClass('deactivated');
    }
    let paginationItem = $('.card-list .card-list__pagination a');
    let prevPage = $('.card-list .card-list__pagination .prev-item');
    let nextPage = $('.card-list .card-list__pagination .next-item');
    processedCardItem = tempCardItem.clone();
    renderItemOfPage();
    let checkboxAddCompare = $('.card-list .card-list__list-item-display .card-item .card-item__description .add-compare input[type="checkbox"]');
    actionWhenChangeCheckbox(checkboxAddCompare, processedCardItem);
    paginationItem.on('click', (event) => {
      onClickToPagination(paginationItem, event);
      renderItemOfPage();
      // INFO: get card list again when change page
      checkboxAddCompare = $('.card-list .card-list__list-item-display .card-item .card-item__description .add-compare input[type="checkbox"]');
      actionWhenChangeCheckbox(checkboxAddCompare, processedCardItem);
      actionButtonPrevOrNextPage(prevPage, nextPage);
    });

    listButtonFilter.on('click', (event) => {
      clearState();
      const this$ = event.currentTarget;
      $(listButtonFilter).removeClass('active');
      $(this$).addClass('active');

      const dataType$ = $(this$).attr('data-type');
      const filter = processedCardItem.filter((index, item) => $(item).attr('data-type') === dataType$);
      totalPage = Math.ceil(filter.length / CARD_ITEM_PER_PAGE);
      pageNow = 1;
      if (dataType$ === 'ALL') {
        totalPage = Math.ceil(processedCardItem.length / CARD_ITEM_PER_PAGE);
        $('.card-list__list-item-display').empty();
        $('.card-list__list-item-display').append(processedCardItem.slice(0, 6));
      } else {
        $('.card-list__list-item-display').empty();
        $('.card-list__list-item-display').append(filter.slice(0, 6));
      }
      renderPage();
      // INFO: get pagination number again when change filter
      paginationItem = $('.card-list .card-list__pagination a');
      prevPage = $('.card-list .card-list__pagination .prev-item');
      nextPage = $('.card-list .card-list__pagination .next-item');
      // INFO: because all action click checkbox play after button filter click, should writing funtion change checkbox in click filter function
      let filterCheckbox = $('.card-list .card-list__list-item-display .card-item .card-item__description .add-compare input[type="checkbox"]');
      filterCheckbox.prop('checked', false);
      if (dataType$ === 'ALL') {
        actionWhenChangeCheckbox(filterCheckbox, processedCardItem);
      } else {
        actionWhenChangeCheckbox(filterCheckbox, processedCardItem);
      }
      // INFO: set state button pagination after filter click
      actionButtonPrevOrNextPage(prevPage, nextPage);
      // INFO: click to page of filter
      paginationItem.on('click', (event) => {
        onClickToPagination(paginationItem, event);
        if (dataType$ === 'ALL') {
          renderItemOfPageFilter(processedCardItem);
          filterCheckbox = $('.card-list .card-list__list-item-display .card-item .card-item__description .add-compare input[type="checkbox"]');
          actionWhenChangeCheckbox(filterCheckbox, processedCardItem);
        } else {
          renderItemOfPageFilter(filter);
          filterCheckbox = $('.card-list .card-list__list-item-display .card-item .card-item__description .add-compare input[type="checkbox"]');
          actionWhenChangeCheckbox(filterCheckbox, processedCardItem);
        }
        actionButtonPrevOrNextPage(prevPage, nextPage);
      })
    })
  },
};
export default CardList;
