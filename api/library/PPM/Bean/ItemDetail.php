<?php
class PPM_Bean_ItemDetail {

	protected $_id;
	protected $_requestType;

	protected $_REQ_VP_PRIORITY;
	protected $_REQD_VP_ACTUAL_HRS;
	protected $_REQ_VP_CLOSED_ON;
	protected $_REQ_VP_KNTA_USR_SCHED_START_DATE;
	protected $_REQ_VP_KNTA_USR_SCHED_FINISH_DATE;
	protected $_REQ_ASSIGNED_TO_NAME;
	protected $_REQ_VP_KNTA_USR_ACTUAL_START_DATE;
	protected $_REQ_VP_KNTA_USR_ACTUAL_FINISH_DATE;
	protected $_REQ_DESCRIPTION;
	protected $_REQ_VP_PROJECT_ID;
	protected $_REQ_VP_CREATED_ON;
	protected $_REQD_VP_SCH_TOTAL_HR;
	protected $_REQ_CREATED_BY;
	protected $_REQ_VP_REQ_TYPE;
	protected $_REQ_VP_KNTA_SCHED_DURATION;
	protected $_REQD_VP_START_TIME;
	protected $_REQD_VP_END_TIME;
	protected $_REQD_VP_CLOSED_DATE;
	protected $_REQ_VP_KNTA_SCHED_EFFORT;
	protected $_REQ_VP_KNTA_ACTUAL_DURATION;
	protected $_REQ_STATUS_NAME;
	protected $_EQ_VP_KNTA_ACTUAL_EFFORT;

	protected $_simpleFields = array();


	public function __construct($response){			
		$this->_id = $response->id;
		$this->_requestType = $response->requestType;

		foreach($response->simpleFields as $simpleField){
			if(isset($simpleField->stringValue)){
				$this->_simpleFields[$simpleField->token] =  $simpleField->stringValue ;
			}
			if(isset($simpleField->dateValue)){
				$this->_simpleFields[$simpleField->token] = $simpleField->dateValue;
			}
		}

	}

	public function __set($name, $value){
		$this->$name = $value;
	}

	public function toArray(){
		return array_merge(array('id'=>$this->_id,
								'requestType'=>$this->_requestType),
							   $this->_simpleFields);
	}
}