<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Get
 *
 * @author fernando.medrano
 */
class PPM_Get {

	public static function userItems($client,$userID){
		if(is_array($userID)){
			$userID = $userID[0];
		}

		try{
			$response = $client->GetUserItems_SenderSync(array('UserID'=>$userID));
		} catch(Exception $e){
			TS_Log::log($e,TS_Log::ERR, $client->__getLastResponse());
			throw new Exception('Unable to get user items.');
		}

		$items = array();
		if(isset($response->Item)){
			if(is_array($response->Item)){
				foreach($response->Item as $item){
					$bean = new PPM_Bean_Item(
					$item->ID,
					$item->Name,
					$item->Type,
					isset($item->SetID) ? $item->SetID : null
					);
					$items[] = $bean->toArray();
					unset($bean);
				}
			}else if($response->Item instanceof stdClass){
				$bean = new PPM_Bean_Item(
				$response->Item->ID,
				$response->Item->Name,
				$response->Item->Type,
				$response->Item->SetID
				);
				$items[] = $bean->toArray();
				unset($bean);
			}
		}
		return $items;
	}

	public static function periods($client){
		try{
			$response = $client->GetAvailablePeriods_SenderSync();
		} catch(Exception $e){
			TS_Log::log($e,TS_Log::ERR);
			throw new Exception('Unable to get periods.');
		}
		$items = array();
		foreach($response->Period as $item){
			$bean = new PPM_Bean_Period(
			$item->ID,
			$item->Name
			);
			$items[] = $bean->toArray();
			unset($bean);
		}
		return $items;
	}

	public static function getSearchCriteria(){
		return new PPM_Bean_SearchCriteria();
	}

	public static function searchTimesheet($client, $searchCriteria){

//        print_r($searchCriteria);exit();
		try{
			$response = $client->SearchTimeSheets_SenderSync(array("searchCriteriaBean"=>$searchCriteria[0]));
		} catch(Exception $e){
			TS_Log::log('e'.$e,TS_Log::ERR);
			throw new Exception('Unable to search timesheet.');
		}
		$timesheets = array();
        if(isset($response->timeSheetId)){
			if(is_array($response->timeSheetId)){
				foreach($response->timeSheetId as $id){
					$timesheets[] = array('timeSheetId' => $id);
				}
			} else {
				$timesheets[] = array('timeSheetId' => $response->timeSheetId);
			}
		}
		return $timesheets;
	}

	public static function getTimesheet($client,$timeSheetId){
		/*
		 We close the session in order to allow multiple php calls
		 http://php.net/session_write_close
		 */
        
		session_write_close();
		
		$timeSheetId = is_array($timeSheetId) ? $timeSheetId[0] : $timeSheetId;

		$response = null;
		try{
			$response = $client->GetTimeSheet_SenderSync(array("timeSheetId" => $timeSheetId));
		} catch(Exception $e){
			TS_Log::log($e->getMessage() . ' ' . $timeSheetId,TS_Log::ERR);
			//throw new Exception('Unable to retrieve timesheet.');
		}

//        print_r($response->return);exit();
		$timesheet = new PPM_Bean_Timesheet($response->return);
//        return $response->return;
		return $timesheet;
	}

	public static function updateTimesheet($client, $timesheet){
		try{
			$response = $client->UpdateTimeSheet_SenderSync($timesheet[0]);
		} catch(Exception $e){
			TS_Log::log($e,TS_Log::ERR);
			throw new Exception('Unable to update timesheet');
		}
		$timesheet = new PPM_Bean_Timesheet($response->return);
		return $timesheet;
	}

	public static function submitTimesheet($client, $timesheet){
		try{
			$response = $client->SubmitTimeSheet_SenderSync($timesheet[0]);
		} catch(Exception $e){
			TS_Log::log($e,TS_Log::ERR);
			throw new Exception('Unable to update timesheet');
		}
		$timesheet = new PPM_Bean_Timesheet($response->return);
		return $timesheet;
	}


	public function getEmptyTimesheet(){
		return new PPM_Bean_Timesheet();
	}
	public function getEmptyTimesheetLine(){
		return new PPM_Bean_TimeSheetLine();
	}
	public function getEmptyUserDataBean(){
		return new PPM_Bean_UserDataBean();
	}

	public function getEmptyActualList(){
		return new PPM_Bean_TimeActualsBean();
	}

	public static function createTimesheet($client, $timesheet){

		$rtimesheet = null;
		try{
			$response = $client->CreateTimeSheet_SenderSync(array("timeSheetBean" => $timesheet[0]->toArray()));
			$rtimesheet = new PPM_Bean_Timesheet($response->return);			
		} catch(SoapFault $e){
			TS_Log::log($e,TS_Log::ERR);
			TS_Log::log($client->__getLastResponse(),TS_Log::ERR);
			throw new Exception("Unable to create timesheet");
		}

		return $rtimesheet->toArray();
	}

	public static function getResourceId($client, $username){
		try{
			$response = $client->GetResourceID_SenderSync(array('Username'=>$username[0]));
		}catch(Exception $e){
			TS_Log::log($e,TS_Log::ERR);
			throw new Exception('Unable to get resource Id ');
		}

		return $response->ResourceID;
	}

	public static function stkAuthenticateUser($client, $request){
		try{
			$response = $client->StkAuthenticateUser($request[0]);
		}catch(Exception $e){
			TS_Log::log($e,TS_Log::ERR);
			TS_Log::log($client->__getLastResponse(),TS_Log::ERR);
			throw new Exception('Unable to login the user.');
		}
		
		if(!isset($response->isValid)){
			TS_Log::log('Unable to login response is not readable',TS_Log::ERR);
			throw new Exception('Unable to login the user.');
		}

		return $response->isValid;
	}

	public static function getUserSapActivities($client, $request){

		try{
			$response = $client->GetUserSAPActivities_SenderSync(array('UserID' => $request[0]));
		}catch(Exception $e){
			TS_Log::log($e, TS_Log::ERR);
			throw new Exception('Unable to retrieve Sap Activities');
		}


		$result = array();
		if(is_array($response->SAPActivity)){
			foreach($response->SAPActivity as $sapActivity){
				$sa = new PPM_Bean_SapActivity($sapActivity);
				$result[] = $sa->toArray();
			}
		}elseif($response->SAPActivity instanceof stdClass){
			$sa = new PPM_Bean_SapActivity($response->SAPActivity);
			$result[] = $sa->toArray();
		}
		
		return $result;
	}
    
    public static function isTimesheetApprover($client, $resourceId){
        $is_approver = false;
        try {
            $response = $client->IsTimesheetApprover_SenderSync(array('UserID' => $resourceId[0]));
            $is_approver = $response->IsApprover;
        } catch (Exception $ex) {

        }
        return $is_approver ? 1 : 0;
    }
    
    public static function earchTimeSheetsByApprover($client, $resourceId){
        try {
            $response = $client->SearchTimeSheetsByApprover_SenderSync(array('ApproverID'=>$resourceId[0]));
        } catch (Exception $ex) {
            throw new Exception('Unable to retrieve timesheets to approve');
        }
        
        return $response;
    }
    
    public static function rejectTimesheet($client, $timeSheetId){
        
        session_write_close();
		
		$timeSheetId = is_array($timeSheetId) ? $timeSheetId[0] : $timeSheetId;

		$response = null;
		try{
			$response = $client->GetTimeSheet_SenderSync(array("timeSheetId" => $timeSheetId));
		} catch(Exception $e){
			TS_Log::log($e->getMessage() . ' ' . $timeSheetId,TS_Log::ERR);
			//throw new Exception('Unable to retrieve timesheet.');
		}
//        print_r($response);exit();
        try {
            $response = $client->RejectTimeSheet_SenderSync(array('timeSheetBean'=>array(
                'timeSheetId' => $response->return->timeSheetId,
                'resourceId' => $response->return->resourceId,
                'periodId' => $response->return->periodId
            )));
        } catch (Exception $ex) {
            throw new Exception('Unable to reject timesheets');
        }
        return TRUE;
    }
    public static function approveTimesheet($client, $timeSheetId){
        
        session_write_close();
		
//        print_r($timeSheetId);exit();
		$timeSheetId = is_array($timeSheetId) ? $timeSheetId[0] : $timeSheetId;

		$response = null;
		try{
			$response = $client->GetTimeSheet_SenderSync(array("timeSheetId" => $timeSheetId));
		} catch(Exception $e){
			TS_Log::log($e->getMessage() . ' ' . $timeSheetId,TS_Log::ERR);
			//throw new Exception('Unable to retrieve timesheet.');
		}
//        print_r($timeSheetId);exit();
        try {
            $response = $client->ApproveTimeSheet_SenderSync(array('timeSheetBean'=>array(
                'timeSheetId' => $response->return->timeSheetId,
                'resourceId' => $response->return->resourceId,
                'periodId' => $response->return->periodId
            )));
        } catch (Exception $ex) {
            throw new Exception('Unable to approve timesheets');
        }
        return TRUE;
    }
    
    public function reworkTimeSheetLine($client, $req){
        session_write_close();
//		print_r($req);exit();
        $req = $req[0];
        $response = null;
		try{
			$response = $client->ReworkTimeSheetLine_SenderSync($req);
		} catch(Exception $e){
			TS_Log::log($e->getMessage(),TS_Log::ERR);
            return FALSE;
		}
        return TRUE;
    }
}
