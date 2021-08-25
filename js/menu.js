let overlay_text = false; //* Hide or show overlay list

//! Stop User frome exiting page and lossing unsave data
window.onbeforeunload = function () {
    return 'btc go burrr';
};

//! Show or hide overly list
function click_text_overlay() {

    //* Check to make sure that the user has click on a text box for editing
    if (user_curr_input != null) {
        if (overlay_text == false) {
            $('#text-list').fadeIn(250);
            document.body.style.overflow = 'hidden';
            user_curr_input.blur(); //* Make it so the text box can NOT be edited
            overlay_text = true;

        } else if (overlay_text == true) {
            $('#text-list').fadeOut(250);
            document.body.style.overflow = 'auto';
            user_curr_input.focus(); //* Make it so the text box can be edited
            overlay_text = false;
        }
    }
}

//! Closes all open textboxes and makes them into makrdown text
function readview() {
    let edit_area = document.getElementById('textarea');
    console.log(edit_area.children);

    for (let x = 0; x < edit_area.children.length; x++) {
        let div = edit_area.children[x];
        outfocus(div.getElementsByTagName('textarea')[0]);
    }
}

//! Menu Btn
function savebtn() {
    let text = get_text();
    save(JSON.stringify(text));
}

function loadbtn() {
    document.getElementById('load-file').click();
}

function addtextBtn(elem) {
    console.log(elem);
    editline('');
    elem.blur();
}

//! ==============

//! Arrow Keys Func for Text Helper (Edit Btn)
let items_helper = $(".text-edit");
let index = -1;
document.addEventListener('keydown', function (event) {

    //! Remove Highlight
    function removeClass(el, className) {
        el.classList.remove(className);
    };

    //! Add Highlight
    function addClass(el, className) {
        el.classList.add(className);
    };


    var len = items_helper.length - 1; //* Length of list

    if (overlay_text == true) {
        //* Move list Down
        if (event.which === 40) {
            index++;

            if (items_helper[index] == undefined) {
                index = 0;
            }

            let back = index - 1; //* Check ahead to make sure item is not undefined
            if (items_helper[back] == undefined) {
                back = len;
            }

            addClass(items_helper[index], 'selected');
            removeClass(items_helper[back], 'selected');

            //* Move list Up
        } else if (event.which === 38) {
            index--;

            if (items_helper[index] == undefined) {
                index = len;
            }

            let back = index + 1; //* Check ahead to make sure item is not undefined
            if (items_helper[back] == undefined) {
                back = 0;
            }

            addClass(items_helper[index], 'selected');
            removeClass(items_helper[back], 'selected');

            //* On Enter Add Text to User Textbox
            //* Using the right arrow key
        } else if (event.keyCode === 39) {
            items_helper[index].click();
        }
    }

}, false);



