/**
 * This module can save the last chapter read in the follows list and marks it as such.
 * This way it's easier to keep track of the current reading progress along all followed stories.
 */
class FollowHighlight extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.followsUrl);
  }

  getDefaultSettings() {
    return {
      highlightColor: '#400',
    };
  }

  initialize() {
    this.chapterBookmark = load(this, 'ChapterBookmark');
    this.listItems = document.getElementsByClassName('fiction-list-item row');
    this.currentChapter = null;
    this.initializeBookmark();
  }

  settingsChanged(newSettings) {
    super.settingsChanged(newSettings);
    this.highlightBookmark();
  }

  initializeBookmark() {
    Array.from(this.listItems).forEach(listItem => {
      let timestamp = listItem.getElementsByTagName('time')[0].getAttribute('unixtime');
      if (this.chapterBookmark && timestamp === this.chapterBookmark.timestamp) {
        listItem.style['background-color'] = this.settings.highlightColor;
        this.currentChapter = listItem;
      }
      listItem.addEventListener('click', _ => this.highlightBookmark(listItem));
    });
  }

  highlightBookmark(listItem) {
    let name = listItem.getElementsByClassName('font-red-sunglo bold')[0].innerHTML;
    let chapter = listItem.getElementsByClassName('col-xs-8')[0].innerHTML;
    let timestamp = listItem.getElementsByTagName('time')[0].getAttribute('unixtime');
    this.chapterBookmark = { name: name, chapter: chapter, timestamp: timestamp };
    save(this, 'ChapterBookmark', this.chapterBookmark);
    if (this.currentChapter) {
      this.currentChapter.style['background-color'] = null;
    }
    listItem.style['background-color'] = this.settings.highlightColor;
    this.currentChapter = listItem;
  }
}