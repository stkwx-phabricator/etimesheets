<?php
class ReworkController extends Zend_Rest_Controller{

	public function init(){

	}

	public function indexAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}

	public function getAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}
	
	public function postAction(){

		
		
		
	}
	public function putAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}
	public function deleteAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}
}