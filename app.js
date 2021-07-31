let sheet = {
    allChars: [],
    allPlaybooks: [],
    basicMoves: [],
    selectedChar: 0,
    parseCharacters: function () {
        $.ajax({
            url: "https://crizzo16.github.io/virtual-motw-char-sheet/characters.json",
            dataType: "json"
        }).done(function (result) {
            sheet.allChars = result;
            sheet.parsePlaybooks();
        });
    },
    parsePlaybooks: function () {
        $.ajax({
            url: "https://crizzo16.github.io/virtual-motw-char-sheet/playbooks.json",
            dataType: "json"
        }).done(function (result) {
            sheet.allPlaybooks = result;
            sheet.parseBasicMoves();
        });
    },
    parseBasicMoves: function () {
        $.ajax({
            url: "https://crizzo16.github.io/virtual-motw-char-sheet/basicMoves.json",
            dataType: "json"
        }).done(function (result) {
            sheet.basicMoves = result;
            sheet.loadBasicMoves();
        });
    },
    loadBasicMoves: function () {
        $("#moves-basic").html("");
        console.log("firing");
        console.log(sheet.basicMoves);
        sheet.basicMoves.forEach(function (item, index, array) {
            let fullMove = $("<div>").addClass("border-red move");

            let moveName = $("<div>").addClass("move-name").addClass(item.stat).html(item.name);
            fullMove.append(moveName);

            item.text.forEach(function (jitem, jindex, jarray) {
                console.log("jitem: ", jitem);
                let moveText = $("<p>").addClass("move-text").html(jitem.text);
                fullMove.append(moveText);
                if (jitem.type == "list") {
                    console.log(jitem.list);
                    let moveList = $("<ul>");
                    jitem.list.forEach(function (kitem, kindex, karray) {
                        let moveListItem = $("<li>").html(kitem);
                        moveList.append(moveListItem);
                    });
                    fullMove.append(moveList);
                }
            });

            $("#moves-basic").append(fullMove);
        });
    }
}

$(document).ready(function () {
    sheet.parseCharacters();
});