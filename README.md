# BetterRRL
Custom Userscript to enhance the reading experience on royalroad.com

To be used with Tampermonkey/Greasemonkey/Violentmonkey I guess.
Only tested with Tampermonkey on Chrome for now.

# Modules
This project is build modular with a custom written (simple) module system.

Currently there are the following modules:

- ad remove: removed banner ads from all pages
- follow highlight: highlights the current chapter in the follow list (v1, not v2) - does so by clicking on the chapter
- bookmark: bookmark a place in the chapter (adds a line on click in a chapter to remember where you left off reading)
- chapter list: shows the full list of chapters next to the reading space
- chapter release: shows the release time of a chapter also under it's name at the top (not only at the bottom of the chapter)
- hide bottom donation row: hides the donation/patreon buttons at the end of a chapter
- navigation: navigate with the arrow keys between chapters
- pagemarkers: draws a line at the top and bottom of the page for easiert page-wise scrolling and reasing
- pagenumbers: splits the website in pages and shows the current page number

# Customizable
In theory many of the features and modules are customizable.

Currently they are only within the source code.
I do want to add an options/settings menu later.

# Coding
New modules currently need to be included in:
- `main.js`: `loadModules()`
- `features.js`: `Features`

I will very likely try to make this better in the future.

Running `python build.py` will generate `build/BetterRRL.user.js`.

This file can be copied to Tampermonkey or be hosted locally to be able to update the script within Tampermonkey.

In the script settings in the **Updates** section a local url can be included.
In the script overview in the **Last updated** column the script will auto update form the update url.
For the script to be updated the version number in `userscript_settings.js` will have to be higher.