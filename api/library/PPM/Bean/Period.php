<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Periods
 *
 * @author fernando.medrano
 */
class PPM_Bean_Period {
    //put your code here
    private $_name      = NULL;
    private $_id        = NULL;
    
    public function __construct($id,$name) {
        $this->_name        = $name;
        $this->_id          = $id;
    }
    
    public function getId(){
        return $this->_id;
    }
    
    public function toArray(){
        return array(
            "id"    => $this->_id,
            "name"  => $this->_name
            );
    }
}
