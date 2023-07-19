const highlights = [
    {
        highlight: /;/gm,
        className: 'sem'
    },
    {
        highlight: /\*+(.+:|(?!.+:))/gm,
        className: 'key'
    },
    {
        highlight: /#\^.+;/gm,
        className: 'comment-todo'
    },
    {
        highlight: /#\?.+;/gm,
        className: 'comment-warning'
    },
    {
        highlight: /#!.+;/gm,
        className: 'comment-important'
    },
    {
        highlight: /#[^!?^].+;/gm,
        className: 'comment'
    },
    {
        highlight: /-[^>].+;/gm,
        className: 'remove'
    },
    {
        highlight: /->/gm,
        className: 'arrow'
    },
    {
        highlight: /[^\t\*]+->[^\t\*]+;/gm,
        className: 'array'
    },
    {
        highlight: /(true|false|null|undefined|NaN);/gm,
        className: 'validator'
    },
    {
        highlight: /%s|%m|%sem|%dp|%h|%br/gm,
        className: 'extra'
    },
    {
        highlight: /ref:/gm,
        className: 'ref'
    },
    {
        highlight: /@.+:/gm,
        className: 'ref_file'
    },
    {
        highlight: /(\t|#.+;)+/gm,
        className: 'tabs'
    },
    {
        highlight: /[^\t\s\*#-]+;/gm,
        className: 'value'
    },
    {
        highlight: /.+/gm,
        className: 'white'
    },
    {
        highlight: /((.+->|[^a-zA-Z0-9])->.+;|.+->;)/gm,
        className: 'error'
    },
    // {
    //     highlight: /(\*(?!.+:)(.+|\r|\n)+\*|((.+->|[^a-zA-Z0-9])->.+;|.+->;))/gm,
    //     className: 'error'
    // }
]

$('.editor').highlightWithinTextarea({
    highlight: highlights
});
$('.preview').highlightWithinTextarea({
    highlight: highlights
});

$('.hwt-container')[0].style.width = '100%';
$('.hwt-container')[0].style.tabSize = '2';
$('.hwt-container')[0].style.letterSpacing = '1.5px';
$('.hwt-backdrop')[0].style.paddingTop = '10px';
$('.hwt-backdrop')[0].style.paddingBottom = '10px';
$('.hwt-content')[0].style.padding = '0';
$('.hwt-container')[0].style.margin = '0';
$('.hwt-backdrop')[0].style.margin = '0';

$('.hwt-container')[1].style.height = '100%';
$('.hwt-container')[1].style.width = '100%';
$('.hwt-container')[1].style.tabSize = '2';
$('.hwt-container')[1].style.letterSpacing = '1.5px';
$('.hwt-highlights')[1].style.fontSize = '6px';