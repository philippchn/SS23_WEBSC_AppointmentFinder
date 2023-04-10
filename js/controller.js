//Starting point for JQuery init
function loaddata() {
    $("#content").empty();
    $.ajax({
        type: "GET",
        url: "php/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointments"},
        dataType: "json",
        success: function (response) {
            $.each(response, function(i, p){
                var element = "<li class=\"list-group-item\" onclick=\"openDetails(this)\" id=\"" + p[0]["id"] + "\">"; 
                element = element + p[0]["titel"] + " | Ort: " + p[0]["ort"] + " | Datum: " + p[0]["datum"] + " | Ablaufdatum: " + p[0]["ablaufdatum"] + "</li>";
                $("#content").append(element);
            })
            $("#content").append("<li class=\"list-group-item\" onclick=\"openCreateNewAppointment()\">Neuen Termin erstellen</li>");
        },
        error: function(){
            console.log("Error");
        }     
    });
}

function openDetails(element){
    $("#content").slideUp(500, function(){
        $("#content").empty();
        $("#content").append("<li class=\"list-group-item\" onclick=\"loaddata()\" style=\"background-color:grey\">Back</li>");
        $("#content").append(element);
        $(element).attr("onclick", "");
        openTimes(element)
    })
}

function openTimes(element){
    $.ajax({
        type: "GET",
        url: "php/serviceHandler.php",
        cache: false,
        data: {method: "queryTimes", id: $(element).attr("id")},
        dataType: "json",
        success: function (response) {
            console.log(response.length);
            $.each(response, function(i, p){
                var element = "<li class=\"list-group-item\" id=\"" + p[0]["id"] + "\""; 
                if(p[0]["status"] == 0){
                    element = element + "onclick=\"openReserve(this)\""
                    element = element + "\">" + p[0]["zeit"] + " | Verfügbar";
                }else{
                    element = element + "\">" + p[0]["zeit"] + " | Gebucht von ";
                    element = element + p[0]["vorname"] + " " + p[0]["nachname"] + " | " + p[0]["kommentar"];
                }
                element = element  + "</li>";
                $("#content").append(element);
            })
            $("#content").slideDown(500);
        },
        error: function(){
            console.log("Error");
        }     
    });
}

function openReserve(element){
    $("#content").slideUp(500, function(){
        $("#content").empty();
        $("#content").append("<li class=\"list-group-item\" onclick=\"loaddata()\" style=\"background-color:grey\">Back</li>");
        $("#content").append(element);
        $("#content").append("<li class=\"list-group-item\">Vorname <input id=\"vorname\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Nachname <input id=\"nachname\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Kommentar <input  id=\"kommentar\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\"><input type=\"button\" value=\"Buchen\" onclick=\"book(" + $(element).attr("id") + ")\"></li>");
        $(element).attr("onclick", "");
        $("#content").slideDown(500);
    })
}

function book(timeID){
    $.ajax({
        type: "POST",
        url: "php/serviceHandler.php",
        cache: false,
        data: {method: "book", id: timeID, vorname: $("#vorname").val(), nachname: $("#nachname").val(), kommentar: $("#kommentar").val() },
        dataType: "json",
        success: function (response) {
            console.log("Success");
            loaddata();
        },
        error: function(){
            console.log("Error");
        }     
    });
}

function openCreateNewAppointment(){
    $("#content").slideUp(500, function(){
        $("#content").empty();
        $("#content").append("<li class=\"list-group-item\" onclick=\"loaddata()\" style=\"background-color:grey\">Back</li>");
        $("#content").append("<li class=\"list-group-item\">Neuen Termin erstellen</li>");
        $("#content").append("<li class=\"list-group-item\">Name <input id=\"name\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Ort <input id=\"ort\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Datum <input  id=\"Datum\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Ablaufdatum <input  id=\"Ablaufdatum\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\"><input type=\"button\" value=\"Erstellen\"></li>");
        $("#content").slideDown(500);
    })
}