/* eslint-disable camelcase */
import CARD_ITEM_PER_PAGE from './declaration';

const g_pagination = $('.card-list .card-list__pagination');
const Pagination = {
  init: (cardItemLength, cb) => {
    Pagination.renderPagination(cardItemLength);
    Pagination.pagingEventHandler = cb;
    Pagination.changePaging('RESET');
  },

  changePaging(changeType, value = 0) {
    switch (changeType) {
      case 'INCREASE':
        Pagination.pagingIndex += 1;
        break;
      case 'DECREASE':
        Pagination.pagingIndex -= 1;
        break;
      case 'RESET':
        Pagination.pagingIndex = 0;
        break;
      case 'SET':
        Pagination.pagingIndex = value;
        break;
      default:
        break;
    }
  },

  getPagingIndex() {
    return Pagination.pagingIndex;
  },

  renderPagination: (totalItem) => {
    let pagingLength = 0;
    let pagingContent = '';
    if (totalItem >= CARD_ITEM_PER_PAGE) {
      pagingLength = Math.ceil(totalItem / CARD_ITEM_PER_PAGE);
    }

    // INFO: check to disable PREV paging
    if (Pagination.pagingIndex === 0) {
      pagingContent += '<a href = "" class = "prev-item disabled" data-index = "PREV"> &laquo;</a>';
    } else {
      pagingContent += '<a href = "" class = "prev-item" data-index = "PREV"> &laquo;</a>';
    }

    for (let i = 0; i < pagingLength; i += 1) {
      if (i === Pagination.pagingIndex) {
        pagingContent += `<a href = "" class = "active" data-index = ${i + 1}>${i + 1}</a>`;
      } else {
        pagingContent += `<a href = "" data-index = ${i + 1}>${i + 1}</a>`;
      }
    }

    // INFO: check to disable NEXT paging
    if (Pagination.pagingIndex === pagingLength - 1 || pagingLength === 0) {
      pagingContent += '<a href = "" class = "next-item disabled" data-index = "NEXT"> &raquo;</a>';
    } else {
      pagingContent += '<a href = "" class = "next-item" data-index = "NEXT"> &raquo;</a>';
    }

    g_pagination.empty().append(pagingContent);
    Pagination._bindEvent();
  },

  _bindEvent: () => {
    g_pagination.find('a').off('click').on('click', (event) => {
      event.preventDefault();
      Pagination.pagingEventHandler(event);
    });
  },
};

export default Pagination;
