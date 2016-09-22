<?php
class Api_Model_Form_Timesheet extends Zend_Form
{
	public function init(){
		$periodId = new Zend_Form_Element_Text('periodId',array('required'=>true));
		$periodId->addValidator('Digits');

		$this->addElements(array($periodId));

	}
}