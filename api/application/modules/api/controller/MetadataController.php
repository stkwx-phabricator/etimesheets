<?php

class MetadataController extends Zend_Rest_Controller
{
	protected $_model;

	public function init()
	{

	}

public function headAction(){
    }
	public function indexAction()
	{
		 
		$times = PPM_Api::periods();
        $now = strtotime('now');
        $under = 0;
        $shown = array();
        foreach($times as &$time){
            $pattern = '(([0-9]+)/([0-9]+)/([0-9]+))';
            preg_match_all($pattern, $time['name'], $matches, PREG_OFFSET_CAPTURE);
            $time["startDate"] = strtotime($matches[0][0][0]); 
            $time["endDate"] = strtotime($matches[0][1][0]);
            
            if($time["startDate"] <= $now && $time["endDate"] >= $now){
                $time['current']    = TRUE;
                $shown[] = $time;
                $under              = 3;
            } else if($under > 0) {
                $shown[]  = $time;
                $under--;
            }
        }
        $under = 0;
        $shown = array_reverse($shown);
        foreach(array_reverse($times) as $time){
            if($time["startDate"] <= $now && $time["endDate"] >= $now){
                $under              = 3;
            } else if($under > 0) {
                $shown[]  = $time;
                $under--;
            }
        }
		if(null !== $times){
			$this->view->resource = array(
                "times"         => array_reverse($shown)
			);
		}else{
			$this->view->resource = array('Can not fetch times');
			$this->getResponse()->setHttpResponseCode(500);
		}
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
