<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Item
 *
 * @author fernando.medrano
 */
class PPM_Bean_Item {
    //put your code here
    protected $_id;
    protected $_name;
    protected $_type;
    protected $_setId;
    
    public function __construct($id,$name,$type,$setId) {    	
        $this->_id      = $id;
        $this->_name    = $name;
        $this->_type    = $type;
        $this->_setId   = $setId;
    }
    
    public function toArray(){
        return array(
            "id"    => $this->_id,
            "name"  => $this->_name,
            "type"  => $this->_type,
            "setId" => $this->_setId
        );
    }
}
