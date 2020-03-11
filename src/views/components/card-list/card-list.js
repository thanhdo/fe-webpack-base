/* eslint-disable camelcase */
import Pagination from './pagination';
import Filter from './filter';
import CARD_ITEM_PER_PAGE from './declaration';

const g_originCardItem = $('.card-list .card-list__list-item .card-item');
const g_displayContainer = $('.card-list__list-item-display');
let g_clonedCardItem = [];

const CardList = {
  init: () => {
    g_clonedCardItem = g_originCardItem.clone();

    function FilterEventHandler(event) {
      const $this = $(event.currentTarget);
      const dataType = $this.attr('data-type');

      // INFO: reset paging param everytime change the filter
      Pagination.changePaging('RESET');
      Filter.setCurrentFilterParam(dataType);
      CardList._filter(dataType);
    }

    function PagingEventHandler(event) {
      const $this = $(event.currentTarget);
      const pagingParam = $this.attr('data-index');

      if (pagingParam === 'PREV') {
        Pagination.changePaging('DECREASE');
      } else if (pagingParam === 'NEXT') {
        Pagination.changePaging('INCREASE');
      } else {
        Pagination.changePaging('SET', pagingParam - 1);
      }

      CardList._filter(Filter.getCurrentFilterParam());
    }

    Pagination.init(g_clonedCardItem.length, PagingEventHandler);
    Filter.init(FilterEventHandler);
    CardList._filter(Filter.getCurrentFilterParam());
  },

  _filter: (filterParam) => {
    let cardItems = null;

    if (filterParam === 'ALL') {
      cardItems = g_clonedCardItem;
    } else {
      cardItems = g_clonedCardItem.filter((index, item) => {
        return $(item).attr('data-type') === filterParam;
      });
    }

    CardList._paging(cardItems);
  },

  _paging: (filteredCardItems) => {
    let pagingCardItems = null;
    const pagingIndex = Pagination.getPagingIndex();

    // TODO: check the slice behavior here if the end number is bigger than array length
    pagingCardItems = filteredCardItems.slice(pagingIndex * CARD_ITEM_PER_PAGE,
      pagingIndex * CARD_ITEM_PER_PAGE + CARD_ITEM_PER_PAGE);

    Pagination.renderPagination(filteredCardItems.length);
    CardList._render(pagingCardItems);
  },

  _render: (cardItems) => {
    g_displayContainer.empty().append(cardItems);
  },
};

export default CardList;
