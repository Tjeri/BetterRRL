BetterRRL.prototype.RegEx = {
    followsUrl: /royalroad\.com\/my\/follows/,
    followListV1Url: /listType=list/,
    chapterUrl: /royalroad\.com\/fiction\/[0-9]+\/.*\/chapter\/[0-9]+\//,

    weirdSeparatorRegex: /^(-| |\\*|#|_)+$/,
    weirdSeparatorWithinRegex: /(<br>|&nbsp;|\n|<span>)+([-*#_])+(<br>|&nbsp;|\n|<\/span>)+/gm,
    emptyLineRegex: /^(&nbsp;| |<br>)*$/,
};