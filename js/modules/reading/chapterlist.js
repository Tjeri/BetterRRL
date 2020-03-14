/**
 * This module shows the list of all chapters next to the chapter itself.
 * It's an easy way to see how far you are or how many more chapters exist.
 */
class ChapterList extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  getDefaultSettings() {
    return {
      // position(s) of the chapter list - left, right or both, should one one of ChapterListPositions
      position: ChapterListPositions.RIGHT,
    };
  }

  getStyle() {
    return `
      .chapterOverview {
        position: fixed;
        background: #1d1d1d;
        top: calc(12.4% + 50px);
        border: 1px solid #555;
        padding: 5px;
        width: 300px;
        max-height: calc(100vh - 24.8% - 100px);
        overflow: auto;
      }
      
      .chapterOverview.left {
        left: 50px;
      }
      
      .chapterOverview.right {
        right: 50px;
      }
      
      .storyLink {
        font-weight: bold;
      }
      
      .storyLink.fixed {
        position: fixed;
        background: #333;
        width: 298px;
        margin-top: -5px;
        margin-left: -5px;
        padding-top: 5px;
        padding-left: 5px;
        padding-bottom: 3px;
        text-decoration: underline;
      }
      
      #currentChapterMarker {
        color: white;
      }
      
      .chapterLink {
        display: block;
      }
    `;
  }

  initialize() {
    let url = this.betterRRL.url;
    this.fictionUrl = url.substr(0, url.indexOf('/chapter'));
    this.fictionName = document.getElementsByClassName('font-white inline-block')[0].innerText.trim();

    this.getChapterList().then();
  }

  async getChapterList() {
    let response = await fetch(this.fictionUrl);
    let html = await response.text();
    let table = html.substring(html.indexOf('<table'), html.indexOf('/table'));

    let chapters = this.getChaptersFromTable(table);
    let container = this.buildContainer(chapters);
    this.addContainerToPage(container);
    this.scrollToCurrentChapter();
  }

  getChaptersFromTable(table) {
    let chapters = [];
    let uselessChars = '<a href="'.length;
    let index = 0;
    while (index < table.length && index > -1) {
      index = table.indexOf('<a', index) + uselessChars;
      let url = table.substring(index, table.indexOf('"', index));
      let name = table.substring(table.indexOf('>', index) + 1, table.indexOf('</a>', index)).trim();
      chapters.push({ url: url, name: name });
      index = table.indexOf('<tr', index);
    }
    return chapters;
  }

  buildContainer(chapters) {
    let container = createElement('div', null, 'chapterOverview');

    container.appendChild(
        createElement('a', { href: this.fictionUrl, innerText: this.fictionName }, 'storyLink', 'fixed'));
    container.appendChild(createElement('a', { href: this.fictionUrl, innerText: this.fictionName }, 'storyLink'));

    chapters.forEach(chapter => {
      let link = createElement('a', { href: chapter.url }, 'chapterLink');
      if (this.betterRRL.url.indexOf(chapter.url) > -1) {
        link.appendChild(createElement('b', { id: 'currentChapterMark', innerText: '> ' }));
      }
      link.appendChild(createElement('span', { innerText: chapter.name }));
      container.appendChild(link);
    });

    return container;
  }

  addContainerToPage(container) {
    let content = document.getElementsByClassName('page-content')[0];
    if ((this.settings.position & ChapterListPositions.LEFT) !== 0) {
      let leftContainer = this.settings.position === ChapterListPositions.BOTH ? container.cloneNode(true) : container;
      leftContainer.classList.add('left');
      content.insertAdjacentElement('beforeend', leftContainer);
    }
    if ((this.settings.position & ChapterListPositions.RIGHT) !== 0) {
      container.classList.add('right');
      content.insertAdjacentElement('beforeend', container);
    }
  }

  scrollToCurrentChapter() {
    let currentChapterLink = document.getElementById('currentChapterMark');
    if (!currentChapterLink) {
      debugger;
      return;
    }
    let captionHeight = document.getElementsByClassName('storyLink fixed')[0].clientHeight;

    currentChapterLink.parentNode.parentNode.scrollTop =
        currentChapterLink.offsetTop - 3 * currentChapterLink.clientHeight - captionHeight;
  }
}

const ChapterListPositions = {
  LEFT: 1,
  RIGHT: 2,
  BOTH: 3,
};