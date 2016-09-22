<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PPM_Bean_Status
 *
 * @author fernando.medrano
 */
class PPM_Bean_Status {
    //put your code here
    protected $_currentId;
    protected $_CurrentMeaning;
    protected $_statuses = array(
        1 => "unsubmitted",
        2 => "pending-approval",
        3 => "in-rework",
        4 => "approved",
        5 => "cancelled",
        6 => "frozen",
        7 => "closed"
    );

    public function __construct($id) {
        $this->_currentId       = $id;
        $this->_CurrentMeaning  = $this->_statuses[$id];
    }
    
    public function toArray(){
        return array(
            "code"        => $this->_currentId,
            "meaning"   => $this->_CurrentMeaning
        );
    }
}
