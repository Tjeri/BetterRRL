/**
 * This module inserts a line on click on the chapter.
 * It's meant to keep track of the reading progress within the chapter.
 * The bookmark will be saved and shown on reload of the page.
 * This unfortunately only works as long as the width of the chapter stays the same.
 */
class Bookmark extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  getDefaultSettings() {
    return {
      horizontalHeight: '1px',

      verticalWidth: '1px',
      verticalHeight: '20px',

      color: 'rgba(255, 0, 0, 0.5)',

      maxBookmarks: -1,
      removeBookmarksDays: 30,
    };
  }

  getStyle() {
    return `
      .bookmark {
        display: inline;
        width: 100%;
        height: ${this.settings.horizontalHeight};
        position: absolute;
        cursor: pointer;
        background: ${this.settings.color} !important;
      }
      
      .bookmark.vertical {
        width: ${this.settings.verticalWidth};
        height: ${this.settings.verticalHeight};
      }
    `;
  }

  initialize() {
    this.bookmarks = load(this, 'Bookmarks', {});
    this.removeOldBookmarks();
    save(this, 'Bookmarks', this.bookmarks);

    this.container = document.getElementsByClassName('portlet chapter')[0];
    this.chapter = this.container.getElementsByClassName('chapter-inner chapter-content')[0];

    document.body.insertAdjacentHTML('beforeend', '<div class="bookmark hidden"></div>');
    this.horizontalLine = document.getElementsByClassName('bookmark hidden')[0];
    document.body.insertAdjacentHTML('beforeend', '<div class="bookmark vertical hidden"></div>');
    this.verticalLine = document.getElementsByClassName('bookmark vertical hidden')[0];

    this.container.addEventListener('click', event => this.clickChapter(event));
    this.horizontalLine.addEventListener('click', _ => this.hideBookmark());
    this.verticalLine.addEventListener('click', _ => this.hideBookmark());

    Array.from(document.getElementsByClassName('.spoilerButton'))
         .forEach(element => element.addEventListener('click', event => {
           event.preventDefault();
           event.stopPropagation();
           return false;
         }));

    let bookmark = this.bookmarks[this.betterRRL.url];
    if (bookmark) {
      this.showBookmark(bookmark);
    }
  }

  settingsChanged(newSettings) {
    super.settingsChanged(newSettings);
    this.removeOldBookmarks();
    location.reload();
  }

  clickChapter(event) {
    let y = event.pageY;
    let top = this.chapter.offsetTop;
    if (y >= top && y <= this.chapter.offsetHeight + top) {
      this.setBookmark(event.pageX, y);
    }
  }

  setBookmark(x, y) {
    let bookmark = {
      time: Date.now(),
      x: x,
      y: y,
    };
    this.updateBookmarks(bookmark);
    this.showBookmark(bookmark);
  }

  showBookmark(bookmark) {
    this.horizontalLine.classList.remove('hidden');
    this.horizontalLine.style.top = bookmark.y + 'px';
    this.verticalLine.classList.remove('hidden');
    this.verticalLine.style.left = bookmark.x + 'px';
    this.verticalLine.style.top = 'calc(' + bookmark.y + 'px - ' + this.settings.verticalHeight + ')';
  }

  hideBookmark() {
    this.horizontalLine.classList.add('hidden');
    this.verticalLine.classList.add('hidden');
    delete this.bookmarks[this.betterRRL.url];
    save(this, 'Bookmarks', this.bookmarks);
  }

  updateBookmarks(newBookmark) {
    let oldBookmark = this.bookmarks[this.betterRRL.url];
    if (!oldBookmark) {
      if (this.settings.maxBookmarks > -1 && Object.keys(this.bookmarks).length === this.settings.maxBookmarks) {
        this.removeOldestBookmark();
      }
    }
    this.bookmarks[this.betterRRL.url] = newBookmark;
    save(this, 'Bookmarks', this.bookmarks);
  }

  removeOldestBookmark() {
    let bookmarks = this.bookmarks;
    let oldestUrl = null;
    let oldestTime = Date.now();
    Object.keys(bookmarks).forEach(url => {
      if (bookmarks[url].time < oldestTime) {
        oldestTime = bookmarks[url].time;
        oldestUrl = url;
      }
    });
    delete this.bookmarks[oldestUrl];
  }

  removeOldBookmarks() {
    let bookmarks = this.bookmarks;
    let oldestAllowedTime = Date.now() - this.settings.removeBookmarksDays * 24 * 60 * 60 * 1000;
    Object.keys(bookmarks).forEach(url => {
      if (bookmarks[url].time < oldestAllowedTime) {
        delete bookmarks[url];
      }
    });
  }
}