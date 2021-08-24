let file_name = '';

//! Get text from each textbox and places them into a arr for saving into .note file
function get_text() {
    let data = []; //* Saving data

    let textarea = document.getElementById('textarea');
    let boxs = textarea.getElementsByClassName('outerdiv'); //* Textboxes

    for (let x = 0; x < boxs.length; x++) {
        let val = boxs[x].getElementsByTagName('textarea')[0].value; //* Get data from textbox [ user textarea ]
        data.push(val);
    }

    return data;
}

//! Take textbox values and put them into a arr and save that as a .note file
function save(data) {

    //* Ask for file name if none is given
    if (file_name == '') {
        let prompt_name = prompt('File Name:', 'Text');

        if (prompt_name == null) {
            //* quit if none is given by user 
            return;
        }

        file_name = prompt_name + '.note';
    }

    //* Saving file to a tag
    let a = document.getElementById('download');
    let file = new Blob([data], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = file_name;
    document.getElementById('page-name').innerText = file_name;
    a.click();
}

//! Basic load func
document.getElementById('load-file').addEventListener('change', function () {
    let prompt = confirm('Warning: Current work will not be save');

    if (prompt == true) {

        file_name = this.files[0].name;

        let reader = new FileReader();

        document.getElementById('textarea').innerHTML = '';

        reader.onload = function () {

            let data = JSON.parse(reader.result);
            for (let x = 0; x < data.length; x++) {
                editline(data[x]);
            }
            readview();
        };

        reader.readAsText(this.files[0]);
        document.getElementById('page-name').innerText = file_name;
    }
});