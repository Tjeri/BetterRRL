/**
 * This module hides the donation row beneath the chapters.
 */
class HideBottomDonationRow extends Module {
  shouldLoadOnPage(url) {
    return url.match(this.betterRRL.RegEx.chapterUrl);
  }

  initialize() {
    let donate = document.getElementById('donate');
    if (donate) {
      donate.nextElementSibling.remove();
      donate.nextElementSibling.remove();
      donate.nextElementSibling.remove();
      donate.remove();
    }
  }
}