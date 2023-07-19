codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});

codeEditor.addEventListener('keydown', e => {
    let { keyCode } = e;
    codeEditor.value = codeEditor.value.replace(/		/g, '\t\t')
    let { value, selectionStart, selectionEnd } = codeEditor;
    if (keyCode === 13) {
        const _values = value.split('')
        let count = 0

        for (let i = 0; i < _values.length; i++) {
            if (i === selectionStart + count + 1) {
                if (_values[i] === '\t') {
                    count++;
                } else {
                    break
                }
            }
        }

        if (count > 0) {
            e.preventDefault();
            $('#codeEditor').sendkeys('{enter}');
            for (let i = 0; i < count; i++) {
                $('#codeEditor').sendkeys('{tab}');
                update(codeEditor.value)
            }
        }
        const __values = value.split('\n')
        let _count = 0
        let __count = 0
        let row = 0

        for (let row_i in __values) {
            __count++;
            for (let char_i in __values[row_i]) {
                __count++
                if (__count === selectionStart) {
                    row += Number(row_i)

                    if (__values[row_i].match(/\*.+:/)) {
                        if (!__values[Number(row_i) + 1]?.match(/.*\*.*/) && !__values[row_i].match(/\*.+:\*/)) {
                            e.preventDefault();
                            $('#codeEditor').sendkeys('{enter}{tab}{tab}{enter}*');
                        }
                    }

                    for (let val of __values[row_i]) {
                        if (val === '\t') {
                            _count++
                        } else {
                            break
                        }
                    }
                }
            }
        }

        if (_count > 0) {
            if (__values[row + 1].length > 0) {
                e.preventDefault();
                $('#codeEditor').sendkeys('{enter}');
                for (let i = 0; i < _count; i++) {
                    $('#codeEditor').sendkeys('{tab}');
                }
            }
        }
    }
    else if (keyCode === 8) {
        if (value[selectionStart - 1] === '\t' && value[selectionStart - 2] === '\t') {
            $('#codeEditor').sendkeys('{backspace}');
            update(codeEditor.value)
        }
    }
    else if (keyCode === 9) {
        e.preventDefault();
        codeEditor.setRangeText(
            '\t\t',
            selectionStart,
            selectionStart,
            'end'
        )
        update(codeEditor.value)
    }
});
codeEditor.addEventListener('keyup', e => {
    preview.value = codeEditor.value;
    update(codeEditor.value.replace(/		/g, '\t\t'))
    $('.preview').highlightWithinTextarea('update')
});

var lineCountCache = 0;
function line_counter() {
    var lineCount = codeEditor.value.split('\n').length;
    var outarr = new Array();
    if (lineCountCache != lineCount) {
        for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + ' ';
        }
        lineCounter.value = outarr.join('\n');
    }
    lineCountCache = lineCount;
}
codeEditor.addEventListener('input', () => {
    line_counter();
});

const update = (data) => {
    file = files[files.indexOf(selected_file)]

    if (file !== 'infos' && data) {

        file.data = data

        new_save = {
            "name": "Main Save",
            "_created_at": new Date().toDateString(),
            "files": files
        }

        _saves = JSON.parse(atob(localStorage.getItem('saves')))
        _saves[saveIndex[0]] = new_save
        console.log(_saves)
        new_saves = btoa(JSON.stringify(_saves))
        console.log(new_saves)

        localStorage.setItem('saves', new_saves)

    }

    $('.editor').highlightWithinTextarea('update')
    $('.preview').highlightWithinTextarea('update')
}