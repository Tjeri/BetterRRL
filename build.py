from typing import List, Dict

replacements: Dict[str, str] = {'.js': '', '/': '_'}


def replace(string: str) -> str:
    result = string
    for substring, replacement in replacements.items():
        result = result.replace(substring, replacement)
    return result


file_paths: List[str] = [
    'userscript_settings.js', 'load.js', 'storage.js', 'main.js', 'regex.js', 'features.js', 'utils.js',
    'module.js',
    'ads/remove.js', 'follows/highlight.js',
    'reading/pagemarkers.js', 'reading/bookmark.js', 'reading/pagenumbers.js', 'reading/chapterrelease.js',
    'reading/navigation.js', 'reading/chapterlist.js', 'reading/hidebottomdonationrow.js'
]
files: Dict[str, str] = dict()

for file_path in file_paths:
    with open('js/' + file_path, 'r') as file:
        files[file_path] = file.read()

full_file = """{userscript_settings}

'use strict';
(function() {{
{storage}
{utils}

{main}
{regex}
{features}

{module}
{ads_remove}
{follows_highlight}
{reading_pagemarkers}
{reading_bookmark}
{reading_pagenumbers}
{reading_chapterrelease}
{reading_navigation}
{reading_chapterlist}
{reading_hidebottomdonationrow}

{load}
}})();
""".format(**{replace(name): files[name] for name in file_paths})

with open('build/BetterRRL.user.js', 'w') as file:
    file.write(full_file)
