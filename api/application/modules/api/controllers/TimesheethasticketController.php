<?php

class TimesheethasticketController extends Zend_Rest_Controller
{
	protected $_model;

	public function init()
	{
		$this->_user = Zend_Registry::get('APP_USER');
	}

	public function indexAction()
	{
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}

	public function getAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}

	public function postAction(){
		$tickets = $this->_getParam('tickets',null);

		if(null === $tickets){
			$object = new stdClass();
			$object->timesheet_id = $this->_getParam('timesheet_id');
			$object->ticket_id = $this->_getParam('ticket_id');
			$object->set_id = $this->_getParam('set_id');
			$tickets = array(0 => $object);
		}

		$timesheet_id = $tickets[0]->timesheet_id;

		$timesheet = PPM_Api::getTimesheet($timesheet_id);

		if($timesheet->getResourceId() != $this->_user->resourceId){
			$this->view->resource = 'Invalid timesheet id';
			$this->getResponse()->setHttpResponseCode(422);
			return ;
		}

		foreach($tickets as $ticket){
			$timeSheetLine = PPM_Api::getEmptyTimeSheetLine();
			$timeSheetLine->setWorkItemId($ticket->ticket_id);
			$timeSheetLine->setWorkItemSetId($ticket->set_id);
			$timeSheetLine->setWorkItemType("REQUEST");

			$timeActualsList = new PPM_Bean_TimeActualsBean();

			$timeActualsList->setTotalsFlag('false');
			$timeActualsList->setEffortsList(array(0,0,0,0,0,0,0));
			$timeSheetLine->addTimeActualsList($timeActualsList);

			$timesheet->addLine($timeSheetLine);
		}
		
        $timesheetUpdated = "Unable to update timesheet";
		try{
			$request = $timesheet->generateRequest();
			$timesheetUpdated = PPM_Api::updateTimesheet(array('timeSheetBean'=>$request));
		} catch(Exception $e){
			TS_Log::log($e->getMessage(),TS_Log::ERR);
			//$this->view->resource = 'Error: ' . $e->getMessage();
            $this->getResponse()->setHttpResponseCode(422);
		}
		$this->view->resource = $timesheetUpdated;
	}

	public function putAction(){
		$id = $this->_getParam('id');
		$var = $this->getRequest()->getPost();
		$data = $var['data'];

		$timesheet = PPM_Api::getTimesheet($id);

		$timelines = $timesheet->getTimeSheetLines();
		$timesheetLinesToUpdate = array();
			
		if($timesheet->getResourceId() != $this->_user->resourceId){
			$this->view->resource = 'Invalid timesheet id';
			$this->getResponse()->setHttpResponseCode(422);
			return ;
		}

        if(!empty($data)){
            foreach($timesheet->timeSheetLines as $key => &$line){
                //convert array to object
                $object = json_decode(json_encode($line), false);
                $objectLine = new PPM_Bean_TimeSheetLine($object);
                $del = true;
                foreach($data as $dataLine){
//                    print_r($line['state']);exit();
                    if($dataLine->timeSheetLineId == $line['timeSheetLineId']){
                        $del = false;
                        foreach($line['timeActualsList'][0] as &$timeActuals){
                            $timeActuals->effortsList = preg_split("/[,]/", $dataLine->effort);
                        }

                        $userDataBean =  new PPM_Bean_UserDataBean((object)array(
                            'userData2' => $dataLine->sapActivityId,
                            'visUserData2' => $dataLine->sapActivityName,
                            'userData3' => 1,
                            'visUserData3' => 'Normal'));

                        $line['userDataBean'] = $userDataBean->toArray();   
                        if($line['state']['code'] == 4){
                            try {
                                PPM_Api::reworkTimeSheetLine(array('timeSheetLineId' => $line['timeSheetLineId'], 'timeSheetBean' => array('timeSheetId'=>$timesheet->timeSheetId, 'resourceId' => $this->_user->resourceId, 'periodId' => $timesheet->periodId)));
                            } catch (Exception $ex) {

                            }
                        }
                    }
                }
                if($del){
                    unset($timesheet->timeSheetLines[$key]);
                }
            } 
        } else {
            $timesheet->emptyLines();
        }

		try{
			$request = $timesheet->generateRequest();
//            print_r($request);exit();
			$timesheet = PPM_Api::updateTimesheet(array('timeSheetBean'=>$request));
		} catch(Exception $e){
			$this->view->resource = $e->getMessage();
			return ;
		}

		$this->view->resource = $timesheet;

	}

	public function deleteAction(){
		$ids = $this->_getParam('ids');

		foreach($ids as $id){
			try{
				$this->_model->find($id)->current()->delete();
			}catch(Exception $e){

			}
		}

		$this->view->resource = $ids;
			
	}


}
