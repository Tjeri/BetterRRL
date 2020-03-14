from os import listdir
from os.path import join, isfile
from typing import Optional


def build_userscript() -> None:
    content = collect_content()
    write_file(content)


def collect_content() -> str:
    userscript_settings = load_file('userscript_settings.js')
    utils = collect_utils()
    main = load_file('main.js')
    modules = collect_modules()
    load = load_file('load.js')
    return """{userscript_settings}

'use strict';
(function() {{
{utils}

{main}        

{modules}

{load}
}})();""".format(userscript_settings=userscript_settings, utils=utils, main=main, modules=modules, load=load)


def collect_utils() -> str:
    utils = ''
    for file_name in listdir(join('js', 'utils')):
        if len(utils) > 0:
            utils += '\n\n'
        utils += load_file(file_name, 'utils')
    return utils


def collect_modules() -> str:
    modules = load_file('module.js', 'modules')
    modules_path = join('js', 'modules')
    for dir_name in listdir(modules_path):
        full_path = join(modules_path, dir_name)
        if isfile(full_path):
            continue
        for file_name in listdir(full_path):
            modules += '\n\n' + load_file(file_name, join('modules', dir_name))

    return modules


def load_file(name: str, path: Optional[str] = '') -> str:
    with open(join('js', path, name), 'r') as file:
        return file.read()


def write_file(content: str) -> None:
    with open('build/BetterRRL.user.js', 'w') as userscript_file:
        userscript_file.write(content)


if __name__ == "__main__":
    build_userscript()
