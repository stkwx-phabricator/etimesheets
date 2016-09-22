<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ActualCost
 *
 * @author fernando.medrano
 */
class PPM_Bean_ActualCost {
    //put your code here
    protected $actualCapLaborMoney      = NULL;
    protected $actualCapNonLaborMoney   = NULL;
    protected $actualOpLaborMoney       = NULL;
    protected $actualOpNonLaborMoney    = NULL;
    protected $plannedCapLaborMoney     = NULL;
    protected $plannedCapNonLaborMoney  = NULL;
    protected $plannedOpNonLaborMoney   = NULL;
    protected $plannedOpLaborMoney      = NULL;
    
    public function __construct($params) {
        if(isset($params->actualCapLaborMoney) && $params->actualCapLaborMoney){
            $this->actualCapLaborMoney = $params->actualCapLaborMoney;
        }
        if(isset($params->actualCapNonLaborMoney) && $params->actualCapNonLaborMoney){
            $this->actualCapNonLaborMoney = $params->actualCapNonLaborMoney;
        }
        if(isset($params->actualOpLaborMoney) && $params->actualOpLaborMoney){
            $this->actualOpLaborMoney = $params->actualOpLaborMoney;
        }
        if(isset($params->actualOpNonLaborMoney) && $params->actualOpNonLaborMoney){
            $this->actualOpNonLaborMoney = $params->actualOpNonLaborMoney;
        }
        if(isset($params->plannedCapLaborMoney) && $params->plannedCapLaborMoney){
            $this->plannedCapLaborMoney = $params->plannedCapLaborMoney;
        }
        if(isset($params->plannedCapNonLaborMoney) && $params->plannedCapNonLaborMoney){
            $this->plannedCapNonLaborMoney = $params->plannedCapNonLaborMoney;
        }
        if(isset($params->plannedOpNonLaborMoney) && $params->plannedOpNonLaborMoney){
            $this->plannedOpNonLaborMoney = $params->plannedOpNonLaborMoney;
        }
        if(isset($params->plannedOpLaborMoney ) && $params->plannedOpLaborMoney ){
            $this->plannedOpLaborMoney = $params->plannedOpLaborMoney;
        }
    }
    
    public function toArray(){
        $response = get_object_vars($this);
        $response = array_filter($response);
        return $response;
    }
}
