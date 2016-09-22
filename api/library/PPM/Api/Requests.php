<?php
class PPM_Api_Requests extends PPM_ToolsRequests{

	public static function getRequests($id){
//        $ids= 283225;
		//$ids = is_array($id) ? $id : array($id);
        $ids = array('id'=>$id);
		//prepare requst parameters
		//foreach($ids as &$id) $id = array('id'=>$id);

		try{
			$response = parent::$_instance->getClient()->GetRequests_SenderSync(array('requestIds'=>$ids));
		}catch(Exception $e){
            TS_Log::log(print_r($e,true),TS_Log::ERR);
			throw new Exception('Unable to retrieve this requests');
		}

		if(is_array($response->return)){
			$items = $response->return;
			$result = array();
			foreach($items as $item){
				$r = new PPM_Bean_ItemDetail($item);
				
				$result[] = $r->toArray();
			}
			return $result;
		}else{
			//transform response
			$itemDetail = new PPM_Bean_ItemDetail($response->return);

			return $itemDetail->toArray();
		}


	}

	public static function createRquests($params){

		$simpleFields = array();
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.DESCRIPTION', $params['description']);
		$simpleFields[] = new PPM_Bean_SimpleField('REQD.VP.DETAILED_DESCRIPTION', $params['detailed_description']);
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.VP.KNTA_USR_SCHED_START_DATE', null,$params['planned_startdate']);
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.VP.KNTA_USR_SCHED_FINISH_DATE',null, $params['planned_enddate']);
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.VP.KNTA_USR_ACTUAL_START_DATE',null, $params['real_startdate']);
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.VP.KNTA_USR_ACTUAL_FINISH_DATE',null, $params['real_enddate']);
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.VP.REQ_TYPE','support');
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.VP.PROJECT_ID', '1-0000004471');
		$simpleFields[] = new PPM_Bean_SimpleField('REQ.ASSIGNED_TO_NAME', 'Jose de Jesus Alvarado Hernandez');
			
		$sm = array();
		foreach($simpleFields as $simpleField){
			$sm[] = $simpleField->get();
		}

		$sm[] = new SoapVar('Application Development Requirement Driven',SOAP_ENC_OBJECT,null,null,'requestType');
		$x = new SoapParam(new SoapVar('Application Development Requirement Driven',SOAP_ENC_OBJECT,null,null,'requestType'), 'requestObj');

		try{
			return parent::$_instance->getClient()->CreateRequests_SenderSync($x);
		}catch(Exception $e){
			print_r(parent::$_instance->getClient());
			exit;
			print_r($e);
			exit;
			throw new Exception($e->getMessage());
		}
	}

}