<?php
class PPM_Bean_SimpleField {
	protected $_token;
	protected $_stringValue;
	protected $_dateValue;

	public function __construct($token, $stringValue = null, $dateValue = null){
		$this->set($token, $stringValue, $dateValue);

		return $this;
	}

	public function set($token, $stringValue = null, $dateValue = null){
		$this->_token = $token;
		$this->_stringValue = $stringValue;
		if(null !== $dateValue){
			$date = DateTime::createFromFormat("Y-m-d", $dateValue);
			$this->_dateValue = $date->format("c");
		}
		return $this;
	}

	public function get(){
		$result = array('token'=>$this->_token);
		if(null !== $this->_stringValue){
			$result['stringValue'] = $this->_stringValue;
		}

		if(null !== $this->_dateValue){
			$result['dateValue'] = $this->_dateValue;
		}


		return new SoapVar(array('token'=>$this->_token,'stringValue'=>$this->_stringValue), SOAP_ENC_OBJECT, null, null, 'simpleFields');;

	}
}