/**
 * This module copies the chapter release information to the top, so
 */
class ChapterRelease extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  initialize() {
    let icon = document.querySelector('i[title="Published"]');
    let time = icon.nextElementSibling;
    let clone = time.cloneNode();
    clone.innerText = time.innerText;
    document.querySelector('h1.font-white').parentNode.appendChild(clone);
  }
}