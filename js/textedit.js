//! Allows elem to be move around
let sort = Sortable.create(document.getElementById('textarea'));


//! Keep Track of What Textbox the user is editing and if they are using it or not
let user_curr_input = null;
let infocus = false;


//! Fixes a bug with links and make sure that they open in a new tab
let click_link = false;


//! Places text within textbox that user was editing
function text_list_helper(val) {
    let clean = val.trim();

    if (user_curr_input != null || user_curr_input != undefined) {
        if (infocus != false) {
            let pos = user_curr_input.selectionStart;

            //* Place text user pick to where the user is typing
            user_curr_input.value = user_curr_input.value.slice(0, pos) + clean + user_curr_input.value.slice(pos);
        }
    }

    //* Hide overlay when text is place into textbox
    click_text_overlay();
}


function textAreaAdjust(element) {
    element.style.height = '140px';
    element.style.height = (element.scrollHeight) + "px";
}


//! Call when user click on unedited text and allow user to edit it
function divclick(element) {
    if (click_link == false) {
        console.log('click');

        element.getElementsByTagName('div')[0].style.display = 'none'; //* Hide markdown text

        sort.options.disabled = true; //* Doesn't allow text to be move around by user

        //* Set what elem that user is currently editing 
        user_curr_input = element.getElementsByTagName('textarea')[0];
        infocus = true;

        element.getElementsByTagName('textarea')[0].style.display = 'block'; //* Show textbox
        element.getElementsByTagName('a')[0].style.display = 'block'; //* Show remove btn
    }
}

//! Call if tab key is press and will close textbox user was editing, making it into text
function tabout(event) {
    if (event.keyCode == 9) {
        outfocus(event.target);
    }
}

//! Make value of textbox user has input into as markdown text and hides textbox from user
function outfocus(element) {
    console.log('outfocus');
    element.style.display = 'none';
    infocus = false;

    let parent = element.parentElement; //* Getting root parent node
    let htmldiv = parent.getElementsByTagName('div')[0]; //* Getting div for markdown elem
    console.log(htmldiv);

    let input = element.value.trim();

    if (input == '' || input == null) {
        removeline(element);
    }

    parent.getElementsByTagName('a')[0].style.display = 'none'; //* Hide remove btn

    console.log('fixed', DOMPurify.sanitize(marked(input)), 'NOT', element.value);

    //* Convert text into html markdown and input that into htmldiv elem
    htmldiv.innerHTML = DOMPurify.sanitize(marked(input));

    htmldiv.style.display = 'block'; //* Show that markdown elem

    sort.options.disabled = false;

    //* Clean up links to make sure they open in new tabs and to make sure that they call a function when clicked
    let links = $('a');
    for (let x = 0; x < links.length; x++) {
        if (links[x].className == "") {
            links[x].target = "__blank";
            links[x].tabIndex = -1;

            //* Stop textarea from pop up when user click on link while showing html markdown 
            links[x].onclick = function () {
                click_link = true;
                setTimeout(function () {
                    click_link = false;
                }, 1000);
            };

        }
    }

}

//! Used for remove btn and remove text
function removeline(element) {
    element.parentElement.remove();
}

//! Create a new elem that has a text and textbox for user
//* Can input '' to create a empty textbox for user
function editline(val) {

    let textarea = document.getElementById('textarea'); //* Where all the text is place

    // * Root Div
    let div = document.createElement('div');
    div.setAttribute('onclick', 'divclick(this)');
    div.className = 'outerdiv';
    // div.id = Math.floor(Math.random() * 256)

    // * Remove Btn
    let btnremove = document.createElement('a');
    btnremove.style.display = 'none';
    btnremove.innerText = 'x';
    btnremove.className += "placeholderbtn"; //* Stop remove btn from being read as a normal a tag
    btnremove.setAttribute('onclick', 'removeline(this)');
    div.append(btnremove);

    // * Display text as html [ Markdown Showing ]
    let htmlarea = document.createElement('div');
    htmlarea.style.display = 'none';
    htmlarea.tabIndex = -1;
    div.append(htmlarea);

    // * Text [ Markdown Editing ]
    let text = document.createElement('textarea');
    text.tabIndex = -1;
    // text.id = Math.floor(Math.random() * 256);
    // console.log(text.id);
    text.value = val;
    text.className += 'mousetrap';
    user_curr_input = text;
    text.setAttribute('onkeyup', 'textAreaAdjust(this)');
    // text.setAttribute('onfocusout', 'outfocus(this)');
    text.addEventListener('keydown', tabout);
    div.append(text);

    textarea.append(div);
}

//* Create textbox on start
editline('');
