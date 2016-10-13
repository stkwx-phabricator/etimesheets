<?php

class TimesheettoapproveController extends Zend_Rest_Controller
{
	protected $_model;
	protected $_user;

	public function init()
	{
        session_write_close();
		$this->_user = Zend_Registry::get('APP_USER');
	}

	public function indexAction()
	{
		$timesheets = PPM_Api::earchTimeSheetsByApprover($this->_user->resourceId);
        if(!is_array($timesheets->timesheet)){
            $timesheets = array($timesheets->timesheet);
        } else {
            $timesheets = $timesheets->timesheet;
        }
		$this->view->resource = $timesheets;
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
        $id = $this->_getParam('id');
//		$timesheet = PPM_Api::getTimesheet($id);
//
//		if($timesheet->getResourceId() != $this->_user->resourceId){
//			$this->view->resource = 'Invalid timesheet id';
//			$this->getResponse()->setHttpResponseCode(422);
//			return ;
//		}

		try{
			$timesheet = PPM_Api::approveTimesheet($id);
		} catch(Exception $e){
			$this->view->resource = $e;
		}

		$this->view->resource = $timesheet;
	}
	public function deleteAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}


}
