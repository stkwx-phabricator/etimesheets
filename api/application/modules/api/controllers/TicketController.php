<?php

class TicketController extends Zend_Rest_Controller
{
	protected $_model;

	public function init()
	{
		$this->_user = Zend_Registry::get('APP_USER');
	}

	public function indexAction()
	{
		$tickets = PPM_Api::userItems($this->_user->resourceId);
		$this->view->resource = $tickets;
	}

	public function getAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}

	public function postAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
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
