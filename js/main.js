class BetterRRL {
    constructor() {
        this.url = document.location.href;
        this.modules = {};
    }

    loadModules() {
        this.modules.RemoveAds = new RemoveAds(this);
        this.modules.FollowHighlight = new FollowHighlight(this);
        this.modules.Bookmark = new Bookmark(this);
        this.modules.ChapterList = new ChapterList(this);
        this.modules.ChapterRelease = new ChapterRelease(this);
        this.modules.HideBottomDonationRow = new HideBottomDonationRow(this);
        this.modules.Navigation = new Navigation(this);
        this.modules.Pagemarkers = new Pagemarkers(this);
        this.modules.Pagenumbers = new Pagenumbers(this);
    }

    initializeModules() {
        let betterRRL = this;
        Object.keys(this.modules).forEach(moduleName => {
            let module = betterRRL.modules[moduleName];
            if (!module.shouldLoadOnPage(document.location.href)) {
                return;
            }
            if (!module.isActive()) {
                return;
            }
            let style = module.getStyle();
            if (style) {
                GM_addStyle(style);
            }
            module.initialize();
        });
    }
}