<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TimeActualsBean
 *
 * @author fernando.medrano
 */
class PPM_Bean_TimeActualsBean {
    //put your code here
    protected $activityId;
    public    $effortsList;
    protected $totalsFlag;
    protected $actualCost;
    
    public function __construct($params = NULL) {
        //var_dump($params);exit();
        if( isset($params->activityId) && $params->activityId != NULL){
            $this->activityId = $params->activityId;
        }
        if( isset($params->effortsList) && $params->effortsList != NULL){
            $this->effortsList = $params->effortsList;
        }
        if( isset($params->totalsFlag) && $params->totalsFlag != NULL){
            $this->totalsFlag = $params->totalsFlag;
        }
        if( isset($params->actualCost) && $params->actualCost != NULL){
            $this->actualCost = $params->actualCost;
        }
    }
    
    public function setTotalsFlag($totalsFlag){
        $this->totalsFlag = $totalsFlag;
    }
    
    public function setEffortsList($effortsList){
        $this->effortsList = $effortsList;
    }
         
    public function toArray(){
        $response = get_object_vars($this);
        $response = array_filter($response);
        return $response;
    }
}
