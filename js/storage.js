function _saveName(module, name) {
    return module.constructor.name + '_' + name;
}

function save(module, name, value) {
    GM_setValue(_saveName(module, name), value);
}

function load(module, name, defaultValue) {
    return GM_getValue(_saveName(module, name), defaultValue);
}