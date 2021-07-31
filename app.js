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
            sheet.loadPCButtons();
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
        sheet.basicMoves.forEach(function (item, index, array) {
            if (item.stat != "Weird" || (item.stat == "Weird" && item.name == sheet.allChars[sheet.selectedChar].weirdMove)) {
                let fullMove = $("<div>").addClass("move");

                let moveName = $("<div>").addClass("move-name").addClass(item.stat).html(item.name);
                fullMove.append(moveName);
                let moveWrapper = $("<div>").addClass("move-wrapper").attr("move-id", item.id);

                item.text.forEach(function (jitem, jindex, jarray) {
                    let moveText = $("<p>").addClass("move-text").html(jitem.text);
                    moveWrapper.append(moveText);
                    if (jitem.type == "list") {
                        let moveList = $("<ul>");
                        jitem.list.forEach(function (kitem, kindex, karray) {
                            let moveListItem = $("<li>").html(kitem);
                            moveList.append(moveListItem);
                        });
                        moveWrapper.append(moveList);
                    }
                });
                fullMove.append(moveWrapper);
                $("#moves-basic").append(fullMove);
            }
        });
    },
    loadPCButtons: function () {
        $("#pc-buttons").html("");
        sheet.allChars.forEach(function (item, index, array) {
            let button = $("<div>").addClass("pc-button").text(item.name).attr("char-id", item.id);
            if (index == 0) button.addClass("pc-selected");
            $("#pc-buttons").append(button);
        });
    },
    selectPC: function () {
        const num = $(this).attr("char-id");
        const sel = $(".pc-selected").attr("char-id");
        if (sel != num) {
            $(".pc-selected").removeClass("pc-selected");
            $(this).addClass("pc-selected");
            sheet.selectedChar = num;

            sheet.loadBasicMoves();
        }
    }
}

$(document).ready(function () {
    sheet.parseCharacters();
});

$(document).on("click", ".pc-button", sheet.selectPC);