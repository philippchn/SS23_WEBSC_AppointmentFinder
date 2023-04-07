<?php
class time {
    public $id;
    public $fk_appointment_id;
    public $zeit;
    public $vorname;
    public $nachname;
    public $kommentar;
    public $status;

    
    function __construct($time_id, $fk_appointment_id, $zeit, $vorname, $nachname, $kommentar, $status) {
        $this->id = $time_id;
        $this->fk_appointment_id = $fk_appointment_id;
        $this->zeit = $zeit;
        $this->vorname = $vorname;
        $this->nachname = $nachname;
        $this->kommentar = $kommentar;
        $this->status = $status;
      }
}
