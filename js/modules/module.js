class Module {
  constructor(betterRRL) {
    this.betterRRL = betterRRL;
    this.settings = this.getSettings();
  }

  shouldLoadOnPage(url) {
    return true;
  }

  isActive() {
    return this.betterRRL.Features[this.constructor.name];
  }

  getDefaultSettings() {
  }

  getSettings() {
    return load(this, 'Settings', this.getDefaultSettings());
  }

  getStyle() {
  }

  initialize() {
  }

  settingsChanged(newSettings) {
    this.settings = newSettings;
    save(this, 'Settings', this.settings);
  }
}
