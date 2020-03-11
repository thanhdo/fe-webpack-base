const Language = {
  init: () => {
    let isDropdownOpen = false;
    const buttonSelectLanguage = $('.language ul.button-select-language');
    const dropdownLanguage = $('.language ul.dropdown-language');

    buttonSelectLanguage.click((event) => {
      const $this = $(event.currentTarget);

      $this.toggleClass('highlighted');
      dropdownLanguage
        .slideDown()
        .css('display', 'flex');

      isDropdownOpen = true;
    });

    dropdownLanguage
      .find('li').click((event) => {
        const $this = $(event.currentTarget);

        dropdownLanguage
          .hide()
          .find('li').removeClass('selected');

        $this.addClass('selected');

        const chosenFlag = $this
          .find('img').attr('src');

        buttonSelectLanguage
          .removeClass('highlighted')
          .find('img').attr('src', chosenFlag);

        isDropdownOpen = false;
      });

    // INFO: if click in document, hide isDropdownOpen.
    $(document).mouseup((e) => {
      if (isDropdownOpen) {
        // INFO: check that you don't click to the dropdown or any of its children
        if (!dropdownLanguage.is(e.target) && dropdownLanguage.has(e.target).length === 0) {
          dropdownLanguage.hide();
          isDropdownOpen = false;
          buttonSelectLanguage
            .removeClass('highlighted')
            .show();
        }
      }
    });
  },
};

export default Language;
