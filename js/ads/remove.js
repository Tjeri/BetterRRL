/**
 * This module tries to remove all the banner ads that pop up.
 */
class RemoveAds extends Module {
  initialize() {
    Array.from(document.getElementsByTagName('h6')).forEach(element => {
      if (element.innerHTML === 'Advertisement') {
        if (element.parentNode.classList.contains('portlet') && element.parentNode.classList.contains('text-center')) {
          element.parentNode.remove();
        } else {
          element.remove();
        }
      }
    });
    Array.from(document.getElementsByClassName('wide')).forEach(element => {
      if (element.getElementsByTagName('iframe').length > 0) {
        element.remove();
        return;
      }
      Array.from(element.children).forEach(child => {
        if (child.id && child.id.indexOf('Content') > -1) {
          element.remove();
        }
      });
    });
  }
}