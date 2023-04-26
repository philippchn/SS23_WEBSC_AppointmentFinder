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
                var element = "<li class=\"list-group-item\" id=\"" + p[0]["id"] + "\">"; 
                element = element + p[0]["titel"] + " | Ort: " + p[0]["ort"] + " | Datum: " + p[0]["datum"] + " | Ablaufdatum: " + p[0]["ablaufdatum"]; 
                element = element + "<input type=\"button\" value=\"Buchen\" onclick=\"openDetails(this.parentElement)\">" + "</li>";
                $("#content").append(element);
            })
            $("#content").append("<li class=\"list-group-item\"><input type=\"button\" value=\"Neuen Termin erstellen\" onclick=\"openCreateNewAppointment()\"></li>");
        },
        error: function(){
            console.log("Error");
        }     
    });
}

function openDetails(element){
    const input = element.querySelector("input");
    element.removeChild(input);
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
                var element = "<li id=\"" + p[0]["id"] + "\""; 
                if(p[0]["status"] == 0){
                    element = element + "class=\"list-group-item\""
                    element = element + "\">" + p[0]["zeit"] + " | Verfügbar <input type=\"button\" value=\"Buchen\" onclick=\"openReserve(this.parentElement)\">";
                }else{
                    element = element + "\" class=\"list-group-item\">" + p[0]["zeit"] + " | Gebucht von ";
                    element = element + p[0]["vorname"] + " " + p[0]["nachname"] + " | " + p[0]["kommentar"];
                }
                element = element  + "</li>";
                $("#content").append(element);
               
            })
            $("#content").slideDown(500);
            $("#content").append("<li class=\"list-group-item\"><input type=\"button\" value=\"Zeitfenster erstellen\" onclick=\"addTimeslot(" + $(element).attr("id") + ")\"></li>");
        },
        error: function(){
            console.log("Error");
        }     
    });
}

function openReserve(element){
    const input = element.querySelector("input");
    element.removeChild(input);
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

function addAppointmentToDb(){
    $.ajax({
        type: "POST",
        url: "php/serviceHandler.php",
        cache: false,
        data: {method: "addAppointmentToDb" , titel: $("#titel").val(), ort: $("#ort").val(), datum: $("#Datum").val(), ablaufdatum: $("#Ablaufdatum").val() },
        dataType: "json",
        success: function (response) {
            console.log("Success");
            loaddata();
        },
        error: function(){
            console.log("Error");
        }     
    });
    loaddata();
}



function openCreateNewAppointment(){
    $("#content").slideUp(500, function(){
        $("#content").empty();
        $("#content").append("<li class=\"list-group-item\" onclick=\"loaddata()\" style=\"background-color:grey\">Back</li>");
        $("#content").append("<li class=\"list-group-item\">Neuen Termin erstellen</li>");
        $("#content").append("<li class=\"list-group-item\">Titel <input id=\"titel\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Ort <input id=\"ort\" type=\"text\"></li>");
        $("#content").append("<li class=\"list-group-item\">Datum <input  id=\"Datum\" type=\"date\"></li>");
        $("#content").append("<li class=\"list-group-item\">Ablaufdatum <input  id=\"Ablaufdatum\" type=\"date\"></li>");
        $("#content").append("<li class=\"list-group-item\"><input type=\"submit\" onclick=\"addAppointmentToDb()\" value=\"Erstellen\"></li>");
        $("#content").slideDown(500);
    })
}

function addTimeslotToDb(){
    console.log($("#zeit").val() + ":00")
    $.ajax({
        type: "POST",
        url: "php/serviceHandler.php",
        cache: false,
        data: {method: "addTimeslotToDb" , zeit: $("#zeit").val() + ":00" },
        dataType: "json",
        success: function (response) {
            console.log("Success");
            loaddata();
        },
        error: function(){
            console.log("Error");
        }     
    });
    loaddata();
}

function addTimeslot(){
    $("#content").slideUp(500, function(){
        $("#content").empty();
        $("#content").append("<li class=\"list-group-item\" onclick=\"loaddata()\" style=\"background-color:grey\">Back</li>");
        $("#content").append("<li class=\"list-group-item\">Zeit<input id=\"zeit\" type=\"time\"></li>");
        $("#content").append("<li class=\"list-group-item\"><input type=\"submit\" onclick=\"addTimeslotToDb()\" value=\"Erstellen\"></li>");
        $("#content").slideDown(500);
    })
}