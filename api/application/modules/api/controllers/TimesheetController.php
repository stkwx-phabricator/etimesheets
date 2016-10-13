<?php

class TimesheetController extends Zend_Rest_Controller
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
		$search = PPM_Api::getSearchCriteria();
		$search->addResourceID($this->_user->resourceId);
//        print_r($search->generateRequest());exit();
		$timesheets = PPM_Api::searchTimesheet($search->generateRequest());
		$this->view->resource = array_reverse($timesheets);
	}

	public function getAction(){
		$id = $this->_getParam('id');
        try{
            $timesheet = PPM_Api::getTimesheet($id);
        } catch (Exception $ex){
            $this->view->resource = 'Could not retrieve TimeSheet';
			$this->getResponse()->setHttpResponseCode(500);
            TS_Log::log($ex->getMessage(),TS_Log::ERR);
			return ;
        }

//        print_r($timesheet);exit();
		if($timesheet->getResourceId() != $this->_user->resourceId){
			$this->view->resource = 'Invalid timesheet id';
			$this->getResponse()->setHttpResponseCode(422);
			return ;
		}

		//retrive sap activities
		try{
			$sapActivities = PPM_Api::getUserSapActivities($this->_user->resourceId);
		}catch(Exception $e){
			$sapActivities = array();
		}
		
		$timesheet = $timesheet->toArray();
		$timesheet['sapActivities'] = $sapActivities;
        $periods = PPM_Api::periods();
        foreach($periods as $period){
            if( $period["id"] == $timesheet["periodId"]){
                $timesheet["period"] = $period;
            }
        }

		$this->view->resource = $timesheet;
	}

	public function postAction(){

		$form = new Api_Model_Form_Timesheet();

		if(!$form->isValid($this->_getAllParams())){
			$this->view->resource = 'Invalid input data';
			$this->getResponse()->setHttpResponseCode(400);
			return ;
		}

		$timesheet = PPM_Api::getEmptyTimesheet();
		$timesheet->setPeriodId($form->getValue('periodId'));
		$timesheet->setResourceId($this->_user->resourceId);

		try{
			$timesheet = PPM_Api::createTimesheet($timesheet);
		} catch(Exception $e){
			$this->view->resource = 'Unable to create timesheet.';
			$this->getResponse()->setHttpResponseCode(500);
			return ;
		}

		$this->view->resource = $timesheet;
	}
	public function putAction(){
		//submit timesheet
		$id = $this->_getParam('id');
		$timesheet = PPM_Api::getTimesheet($id);

		if($timesheet->getResourceId() != $this->_user->resourceId){
			$this->view->resource = 'Invalid timesheet id';
			$this->getResponse()->setHttpResponseCode(422);
			return ;
		}

		try{
			$request = $timesheet->generateRequest();
			$timesheet = PPM_Api::submitTimesheet(array('timeSheetBean'=>$request));
		} catch(Exception $e){
			$this->view->resource = $e;
		}

		$this->view->resource = $timesheet;

	}
	public function deleteAction(){
        $id = $this->_getParam('id');
        PPM_Api::rejectTimesheet($id);
		$this->view->resource = 'Rejected';
		$this->getResponse()->setHttpResponseCode(200);
	}


}
