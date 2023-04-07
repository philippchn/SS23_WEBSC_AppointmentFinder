<?php
include("appointment.php");
include("time.php");
class DataHandler
{
    public function queryAppointments()
    {
        $res =  $this->getAllAppointmentsfromDB();
        return $res;
    }
    public function queryTimes($id)
    {
        $res =  $this->getTimesOfAppointmentfromDB($id);
        return $res;
    }
    public function book($id, $vorname, $nachname, $kommentar){
        require_once ('../db/dbaccess.php');
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "UPDATE `timeslots` SET `status` = '1', `vorname` = '" . $vorname . "', `nachname` = '" . $nachname . "', `kommentar` = '" . $kommentar . "' WHERE `timeslots`.`time_id` = " . $id;
        $db_obj->query($sql);
    }
    private static function getDemoData()
    {
        $demodata = [
            [new appointment(1, "Meeting 1", "Ort 1", "2023.12.20", "2023.11.20")],
            [new appointment(2, "Meeting 2", "Ort 2", "2023.12.21", "2023.11.21")],
            [new appointment(3, "Meeting 3", "Ort 3", "2023.12.22", "2023.11.22")],
            [new appointment(4, "Meeting 4", "Ort 4", "2023.12.23", "2023.11.23")],
            [new appointment(5, "Meeting 5", "Ort 5", "2023.12.24", "2023.11.24")],
        ];
        return $demodata;
    }
    private static function getAllAppointmentsfromDB()
    {
        require_once ('../db/dbaccess.php');
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "SELECT * FROM appointment";
        $result = $db_obj->query($sql);
        
        $data = [];
        while($row = $result->fetch_object()){
            $id = $row->appointment_id;
            $titel = $row->titel;
            $ort = $row->ort;
            $datum = $row->datum;
            $ablaufdatum = $row->ablaufdatum;
            $appointment = new appointment($id, $titel, $ort, $datum, $ablaufdatum);
            $data[] = [$appointment];
        }
        return $data;
    }
    private static function getTimesOfAppointmentfromDB($id){
        $data = [];
        require_once ('../db/dbaccess.php');
        
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "SELECT * FROM timeslots WHERE fk_appointment_id = " . $id;
        $result = $db_obj->query($sql);
        while($row = $result->fetch_object()){
            $id = $row->time_id;
            $fk = $row->fk_appointment_id;
            $zeit = $row->zeit;
            $vorname = $row->vorname;
            $nachname = $row->nachname;
            $kommentar = $row->kommentar;
            $status = $row->status;
            $time = new time($id, $fk, $zeit, $vorname, $nachname, $kommentar, $status) ;
            $data[] = [$time];
        }
        return $data;
    }
}