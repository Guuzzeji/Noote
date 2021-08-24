let quick_keys = {
    helper: 'ctrl+space',
    read: 'shift+tab',
    save: 'ctrl+s',
    new_line: 'shift+space',
};


Mousetrap.bind(quick_keys.helper, function (e) {
    click_text_overlay();
    document.getElementsByClassName('text-edit')[0].focus(); //* Put textarea in focus
});

Mousetrap.bind(quick_keys.read, function (e) {
    readview();
});

Mousetrap.bind(quick_keys.save, function (e) {
    savebtn();
});

Mousetrap.bind(quick_keys.new_line, function (e) {
    editline('');
});