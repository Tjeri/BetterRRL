/**
 * This module inserts 2 lines on the top and the bottom of the page.
 * The lines showcase the area that is scrolled on a full page scroll (Page Up/Down or Space).
 * The area between the top and the top line equals the area between the bottom line and the bottom after a scroll.
 * Reading pagewise it's easier to keep track of the progress after scrolling.
 */
class Pagemarkers extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  getDefaultSettings() {
    return {
      // height of the pagemarkers - it's also the thickness
      height: '1px',
      // color of the pagemarkers
      color: 'rgba(255, 0, 0, 0.5)',

      // distance to top and bottom of the page. 12.4% is the exact measure for Google Chrome
      distance: '12.4%',
    };
  }

  getStyle() {
    return `
      .pagemarker {
        width: 100%;
        height: ${this.settings.height};
        position: fixed;
        background: ${this.settings.color} !important;
      }
      
      .pagemarker.top {
        top: ${this.settings.distance};
      }
      
      .pagemarker.bottom {
        bottom: ${this.settings.distance};
      }
    `;
  }

  initialize() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="pagemarker top"></div>');
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="pagemarker bottom"></div>');
  }

  settingsChanged(newSettings) {
    super.settingsChanged(newSettings);
    location.reload();
  }
}