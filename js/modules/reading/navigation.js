/**
 * This module makes navigation through the chapters easier by using mainly arrow keys to go forwards or backwards.
 */
class Navigation extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  getDefaultSettings() {
    return {
      // key events for next chapter
      next: ['ArrowRight'],
      // key events for previous chapter
      previous: ['ArrowLeft'],
    }
  }

  initialize() {
    document.addEventListener('keyup', event => {
      if (this.settings.next.indexOf(event.key) > -1) {
        this.clickButton('Next Chapter');
      } else if (this.settings.previous.indexOf(event.key) > -1) {
        this.clickButton('Previous Chapter');
      }
    });
  }

  clickButton(innerText) {
    Array.from(document.getElementsByClassName('btn btn-primary')).some(btn => {
      if (btn.text === innerText) {
        btn.click();
        return true;
      }
    });
  }
}