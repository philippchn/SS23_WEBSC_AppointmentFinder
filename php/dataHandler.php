<?php
include("appointment.php");
include("time.php");
class DataHandler
{
    public function queryAppointments()
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
    public function queryTimes($id)
    {
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
    public function book($id, $vorname, $nachname, $kommentar){
        require_once ('../db/dbaccess.php');
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "UPDATE `timeslots` SET `status` = '1', `vorname` = '" . $vorname . "', `nachname` = '" . $nachname . "', `kommentar` = '" . $kommentar . "' WHERE `timeslots`.`time_id` = " . $id;
        $db_obj->query($sql);
        return;
    }

    public function addAppointmentToDb($titel, $ort, $datum, $ablaufdatum){
        require_once ('../db/dbaccess.php');
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "INSERT INTO appointment(titel,ort,datum,ablaufdatum) VALUES(?,?,?,?)";
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param('ssss', $titel, $ort, $datum, $ablaufdatum);
        $stmt->execute();
        return;
    }

    public function addTimeslotToDb($zeit, $ts_id){
        require_once ('../db/dbaccess.php');
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "INSERT INTO timeslots(fk_appointment_id, zeit) VALUES(?,?)"; 
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param('ss', $ts_id, $zeit);
        $stmt->execute();
        return;
    }

    public function deleteAppointment($app_id){
        require_once ('../db/dbaccess.php');
        $db_obj = new mysqli($host, $user, $password, $database);
        $sql = "DELETE FROM timeslots WHERE fk_appointment_id = " . $app_id;
        $db_obj->query($sql);
        $sql = "DELETE FROM appointment WHERE appointment_id = " . $app_id;
        $db_obj->query($sql);
        return;
    }
}