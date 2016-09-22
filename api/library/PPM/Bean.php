<?php
class PPM_Bean {

	protected $_map = array('timeSheetLines' => 'PMM_Bean_TimeshineLine');

	public function __construct($response){
		foreach($response as $itemName => $itemValue){
			switch(gettype($itemValue)){
				case "object" : ;
			}
			echo $itemName . ' => '.gettype ($itemValue) . "\n";
		}
	}

	protected function _castObject($name, $value){
		if(!key_exists($name, $this->$map)){
			throw new Exception('Not recognized class name');
		}

		$this->$name = new $this->_map[$name]($value);

		return $this;
	}

	public function toArray(){

	}

	public function toSoapRequest(){

	}

}