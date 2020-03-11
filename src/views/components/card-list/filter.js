/* eslint-disable camelcase */
const g_buttonFilter = $('.card-list .card-list__filter .choice-button');
const Filter = {
  init: (cb) => {
    Filter._bindEvent(cb);
    Filter.currentFilterParam = 'ALL';
    Filter.filterEventHandler = cb;
  },

  getCurrentFilterParam() {
    return Filter.currentFilterParam;
  },

  setCurrentFilterParam(newValue) {
    Filter.currentFilterParam = newValue;
  },

  _bindEvent() {
    g_buttonFilter.click((event) => {
      g_buttonFilter.removeClass('active');
      const $this = $(event.currentTarget);
      $this.addClass('active');
      Filter.filterEventHandler(event);
    });
  },
};

export default Filter;
