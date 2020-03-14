/**
 * This module splits the website in pages and shows the current page number at all times.
 * So it shows the page/pages of the current chapter.
 */
class Pagenumbers extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  getDefaultSettings() {
    return {
      // how much the browser scrolls for each page. Chrome does 87.6% of the page every time
      scrollDistance: 0.876,

      // which positions the page numbers should appear - should be of PageNumberPositions
      activePageNumberPositions: [PageNumberPositions.TOP_LEFT, PageNumberPositions.TOP_RIGHT],

      // distance from the left to the page numbers on the left
      leftDistance: '200px',
      // distance from the right to the page numbers on the right
      rightDistance: '200px',
      // distance from the top to the page numbers on the top (just over the top pagemarker)
      topDistance: 'calc(12.4% - 20px)',
      // distance from the bottom to the page numbers on the bottom (just over the bottom pagemarker)
      bottomDistance: 'calc(12.4% + 20px)',
    };
  }

  getStyle() {
    return `
      .pageNum {
        position: fixed;
      }
      
      .pageNum.top {
        top: ${this.settings.topDistance};
      }
      
      .pageNum.bottom {
        bottom: ${this.settings.bottomDistance};
      }
      
      .pageNum.left {
        left: ${this.settings.leftDistance};
      }
      
      .pageNum.right {
        right: ${this.settings.rightDistance};
      }
    `;
  }

  initialize() {
    this.chapter = document.getElementsByClassName('chapter-inner chapter-content')[0];
    this.pageNumberElements = {};

    this.settings.activePageNumberPositions.forEach(position => {
      if (this.pageNumberElements[position]) {
        return;
      }
      let classes = 'pageNum';
      if ((PageNumberPositionOptions.TOP & position) !== 0) {
        classes += ' top';
      }
      if ((PageNumberPositionOptions.BOTTOM & position) !== 0) {
        classes += ' bottom';
      }
      if ((PageNumberPositionOptions.LEFT & position) !== 0) {
        classes += ' left';
      }
      if ((PageNumberPositionOptions.RIGHT & position) !== 0) {
        classes += ' right';
      }
      document.body.insertAdjacentHTML('beforeend', `<div class="${classes}"></div>`);
      this.pageNumberElements[position] = document.getElementsByClassName(classes)[0];
    });

    this.updatePageNumber();

    setTimeout(_ => this.updatePageNumber(), 500);

    window.addEventListener('scroll', _ => this.updatePageNumber());
  }

  settingsChanged(newSettings) {
    super.settingsChanged(newSettings);
    location.reload();
  }

  updatePageNumber() {
    let pageHeight = window.innerHeight * this.settings.scrollDistance;
    let remainingHeight = window.innerHeight * (1 - this.settings.scrollDistance);
    let currentPage = Math.round(window.pageYOffset / pageHeight) + 1;
    let bounds = this.chapter.getBoundingClientRect();
    let totalPages = Math.ceil((bounds.top + bounds.height + window.pageYOffset - remainingHeight) / pageHeight);
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    Object.keys(this.pageNumberElements).forEach(position => {
      this.pageNumberElements[position].innerText = currentPage + '/' + totalPages;
    });
  }
}

const PageNumberPositionOptions = {
  TOP: 1,
  BOTTOM: 2,
  LEFT: 4,
  RIGHT: 8,
};
const PageNumberPositions = {
  TOP_LEFT: PageNumberPositionOptions.TOP + PageNumberPositionOptions.LEFT,
  TOP_RIGHT: PageNumberPositionOptions.TOP + PageNumberPositionOptions.RIGHT,
  BOTTOM_LEFT: PageNumberPositionOptions.BOTTOM + PageNumberPositionOptions.LEFT,
  BOTTOM_RIGHT: PageNumberPositionOptions.BOTTOM + PageNumberPositionOptions.RIGHT,
};