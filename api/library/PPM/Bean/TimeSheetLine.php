<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TimeSheetLine
 *
 * @author fernando.medrano
 */
class PPM_Bean_TimeSheetLine {
    //put your code here
    protected $timeSheetLineId          = NULL;
    protected $workItemId               = NULL;
    protected $workItemSetId            = NULL;
    protected $workItemType             = NULL;
    protected $state                    = NULL;
    public    $timeActualsList          = array();
    protected $chargeCodesList          = NULL;
    protected $updateChargeCodeFlag     = NULL;
    protected $requireChargeCodeFlag    = NULL;
    protected $userDataBean             = NULL;
    protected $actualApproverUserId     = NULL;
    protected $effortOnWorkItemEntityFlag       = NULL;
    protected $tmWorkUnitId                     = NULL;
    protected $timeApproverParticipantGroupId   = NULL;
    protected $timeApproverSecurityGroupId      = NULL;
    protected $timeApproverUsersIds             = NULL;
    protected $billingApproverPrticipantGroupId = NULL;
    protected $billingApproverSecurityGroupId   = NULL;
    protected $billingApproverUsersIds          = NULL;
    protected $description                      = NULL;
    protected $project                          = NULL;


    public function __construct($params = NULL) {
//        var_dump($params);exit();
        if(isset($params->timeSheetLineId) && $params->timeSheetLineId != NULL){
            $this->timeSheetLineId = $params->timeSheetLineId;
//            var_dump($params);exit();
        }
        if(isset($params->workItemId) && $params->workItemId != NULL){
            $this->workItemId = $params->workItemId;
        }
        if(isset($params->workItemSetId) && $params->workItemSetId != NULL){
            $this->workItemSetId = $params->workItemSetId;
        }
        if(isset($params->workItemType) && $params->workItemType != NULL){
            $this->workItemType = $params->workItemType;
        }
        if(isset($params->updateChargeCodeFlag) && $params->updateChargeCodeFlag != NULL){
            $this->updateChargeCodeFlag = $params->updateChargeCodeFlag;
        }
        if(isset($params->requireChargeCodeFlag) && $params->requireChargeCodeFlag != NULL){
            $this->requireChargeCodeFlag = $params->requireChargeCodeFlag;
        }
        if(isset($params->state) && $params->state != NULL){
            $this->state = new PPM_Bean_Status($params->state->code);
            $this->state = $this->state->toArray();
        }
        if(isset($params->userDataBean) && $params->userDataBean != NULL){
            $this->userDataBean = new PPM_Bean_UserDataBean($params->userDataBean);
            $this->userDataBean = $this->userDataBean->toArray();
        }
        if(isset($params->timeApproverUsersIds) && $params->timeApproverUsersIds != NULL){
            $this->timeApproverUsersIds = $params->timeApproverUsersIds;
        }
        if(isset($params->timeActualsList) && $params->timeActualsList != NULL){
            $this->timeActualsList[] = $params->timeActualsList;
        }
    }
    
    public function setWorkItemId($workItemId){
        $this->workItemId = $workItemId;
    }
    
    public function setWorkItemSetId($workItemSetId){
        $this->workItemSetId = $workItemSetId;
    }
    
    public function setWorkItemType($workItemType){
        $this->workItemType = $workItemType;
    }
    
    public function addTimeActualsList($timeActualsList){
        $this->timeActualsList[] = $timeActualsList->toArray();
    }
        
    public function getDescription(){
//        var_dump($this->workItemId);exit();
        try{
            $ticket = PPM_Api_Requests::getRequests($this->workItemId);
            $this->description = $ticket["REQ.DESCRIPTION"];
            $this->project = $ticket["REQ.VP.PROJECT"];
        } catch(Exception $e){
            $this->description = "Information not available";
            $this->project = "Information not available";
        }
//        var_dump($ticket["REQ.DESCRIPTION"]);exit();
    }
    public function toArray(){
        
        $response = get_object_vars($this);
        $response = array_filter($response);
        return $response;
        
    }
}
