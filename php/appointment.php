<?php
class appointment {
    public $id;
    public $titel;
    public $ort;
    public $datum;
    public $ablaufdatum;
    
    function __construct($id, $titel, $ort, $datum, $ablaufdatum,) {
        $this->id = $id;
        $this->titel = $titel;
        $this->ort=$ort;
        $this->datum=$datum;
        $this->ablaufdatum=$ablaufdatum;
      }
}
