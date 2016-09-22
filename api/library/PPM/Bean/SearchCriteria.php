<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of searchCriteria
 *
 * @author fernando.medrano
 */
class PPM_Bean_SearchCriteria {
    //put your code here
    private $periodId;
    private $periodTypeId;
    private $previousTimePeriodsCount = 60;
    private $descriptionKeywords;
    private $resourceIdList = array();
    private $statusList = array(1,3);
    private $managerIdList;
    private $orgUnitIdList;
    
    public function addResourceId($resourceId){
        $this->resourceIdList[] = $resourceId;
    }
    
    public function generateRequest(){
  		$vars = array();
    	$vars[] = new SoapVar($this->previousTimePeriodsCount,XSD_STRING,null,null,'previousTimePeriodsCount','http://mercury.com/ppm/tm/1.0');
    	
    	foreach($this->resourceIdList as $resource){
    		$vars[] = new SoapVar($resource,XSD_STRING,null,null,'resourceIdList','http://mercury.com/ppm/tm/1.0');
    	}
    	foreach($this->statusList as $resource){
    		$vars[] = new SoapVar($resource,XSD_STRING,null,null,'statusList','http://mercury.com/ppm/tm/1.0');
    	}
  		
    	return new SoapVar($vars, SOAP_ENC_OBJECT, null,null,'searchCriteriaBean','http://mercury.com/ppm/tm/1.0');
    }
    
    public function toArray(){
        $response = (array)$this;
        $response = array_filter($response);
        return $response;
    }
}
