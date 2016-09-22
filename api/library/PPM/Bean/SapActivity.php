<?php
class PPM_Bean_SapActivity {

	private $SAPActivityID;
	private $SAPActivityName;
	private $ProjectName;
	private $ActivityFrom;
	private $ActivityTo;


	public function __construct($response = null){
		$this->SAPActivityID = (isset($response->SAPActivityID) && $response->SAPActivityID != null) ?  $response->SAPActivityID : null;
		$this->SAPActivityName = (isset($response->SAPActivityName) && $response->SAPActivityName != null) ?  $response->SAPActivityName : null;
		$this->ProjectName = (isset($response->ProjectName) && $response->ProjectName != null) ?  $response->ProjectName : null;
		$this->ActivityFrom = (isset($response->ActivityFrom) && $response->ActivityFrom != null) ?  $response->ActivityFrom : null;
		$this->ActivityTo = (isset($response->ActivityTo) && $response->ActivityTo != null) ?  $response->ActivityTo : null;
	}

	public function toArray(){
		$response = get_object_vars($this);
		$response = array_filter($response);
		return $response;
	}
}