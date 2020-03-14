function createElement(tag, options, ...classes) {
  let element = document.createElement(tag);
  if (options) {
    Object.keys(options).forEach(name => {
      element[name] = options[name];
    });
  }
  if (classes) {
    classes.forEach(cls => element.classList.add(cls));
  }
  return element;
}