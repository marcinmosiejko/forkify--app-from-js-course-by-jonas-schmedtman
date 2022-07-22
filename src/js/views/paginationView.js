import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //   console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      //   console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // Page=1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      ${this._generateButtonMarkup(curPage, 1)}
      `;
    }
    // Last page, there are other pages
    if (curPage === numPages && numPages > 1) {
      return `
      ${this._generateButtonMarkup(curPage, -1)}
      `;
    }
    // Other page
    if (curPage > 1 && curPage < numPages) {
      return `
      ${this._generateButtonMarkup(curPage, -1)}
        ${this._generateButtonMarkup(curPage, 1)}
      `;
    }
    // Page=1, there are NO other pages - is the only scenario left
    return '';
  }

  _generateButtonMarkup(curPage, direction = -1) {
    return `
        <button data-goto="${
          curPage + direction
        }" class="btn--inline pagination__btn--${
      direction === -1 ? 'prev' : 'next'
    }">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${
      direction === -1 ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${curPage + direction}</span>
        </button>
    `;
  }
}

export default new PaginationView();
