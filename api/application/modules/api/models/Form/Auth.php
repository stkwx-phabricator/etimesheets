<?php
class Api_Model_Form_Auth extends Zend_Form
{
	public function init(){
		$username = new Zend_Form_Element_Text('username',array('required'=>true));
		$username->addFilter('StripTags')
		->addValidator( 'NotEmpty' , true )
		->addFilter('StringTrim');

		$password = new Zend_Form_Element_Password('password',array('required'=>true));

		$this->addElements(array($username, $password));
	}
}
