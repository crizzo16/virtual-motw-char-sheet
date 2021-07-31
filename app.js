let sheet = {
    allChars: [],
    allPlaybooks: [],
    selectedChar: 0,
    parseCharacters: function() {
        $.ajax({
            url: "https://crizzo16.github.io/virtual-motw-char-sheet/characters.json",
            dataType: "json"
        }).done(function (result) {
            sheet.allChars = result;
            sheet.parsePlaybooks();
        });
    },
    parsePlaybooks: function() {
        $.ajax({
            url: "https://crizzo16.github.io/virtual-motw-char-sheet/playbooks.json",
            dataType: "json"
        }).done (function (result) {
            sheet.allPlaybooks = result;
        });
    }
}

$(document).ready(function () {
    sheet.parseCharacters();
});