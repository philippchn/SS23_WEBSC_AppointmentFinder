<?php
    
include("dataHandler.php");
header('Content-Type: application/json');

if(isset($_GET["method"])){
    $method = $_GET["method"];
}
if(isset($_POST["method"])){
    $method = $_POST["method"];
}

$dh = new DataHandler();

if($method == "queryAppointments"){
    $data = $dh->queryAppointments();
    http_response_code(200);
    echo (json_encode($data));
}

if($method == "queryTimes"){
    $data = $dh->queryTimes($_GET["id"]);
    http_response_code(200);
    echo (json_encode($data));
}

if($method == "book"){
    $vorname = $_POST["vorname"];
    $nachname = $_POST["nachname"];
    $kommentar = $_POST["kommentar"];
    $id = $_POST["id"];
    $dh->book($id, $vorname, $nachname, $kommentar);
    http_response_code(200);
    $response = array("status" => "Success");
    echo (json_encode($response));
}
