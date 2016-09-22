<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Timesheet
 *
 * @author fernando.medrano
 */
class PPM_Bean_Timesheet {
	//put your code here
	private $resourceId;
	public $periodId;
	//    //optional
	public $timeSheetId                       = null;
	private $description                       = null;
	private $sequence                          = null;
	private $state                             = null;
	private $exceptionMessage                  = null;
	private $timeApproverParticipantGroupId    = null;
	private $timeApproverSecurityGroupId       = null;
	private $timeApproverUsersIds              = null;
	private $billingApproverParticipantGroupId = null;
	private $billingApproverSecurityGroupId    = null;
	private $billingApproverUsersIds           = null;
	private $bucketShowLevel                   = null;
	private $bucketReportMethod                = null;
	private $periodHoursCalcTypeCode           = null;
	private $hoursInPeriodType                 = null;
	private $hoursPerPeriod                    = null;
	private $workdayHours                      = null;
	private $maximumHoursPerDay                = null;
	private $maximumHoursPerTimeSheet          = null;
	private $minimumHoursPerTimeSheet          = null;
	private $maximumDaysPerDay                 = null;
	private $maximumDaysPerTimeSheet           = null;
	private $minimumDaysPerTimeSheet           = null;
	private $maximumPercentPerTimeSheet        = null;
	private $minimumPercentPerTimeSheet        = null;
	private $allowMultipleTimeSheets           = null;
	private $notifyDelinquentTimeSheet         = null;
	private $reqActivitiesRequiredFlag         = null;
	private $tskActivitiesRequiredFlag         = null;
	private $prjActivitiesRequiredFlag         = null;
	private $pkgActivitiesRequiredFlag         = null;
	private $miscActivitiesRequiredFlag        = null;
	private $reqWorkItemEnabledFlag            = null;
	private $tskWorkItemEnabledFlag            = null;
	private $prjWorkItemEnabledFlag            = null;
	private $pkgWorkItemEnabledFlag            = null;
	private $mscWorkItemEnabledFlag            = null;
	private $enforcementLevelError             = null;
	public  $timeSheetLines                    = array();
    private $period                             = NULL;
	//
	public function __construct($response = NULL) {
		//        echo "hs";exit();
		if(isset($response->timeSheetId) && $response->timeSheetId != NULL){
			$this->timeSheetId = $response->timeSheetId;
		}
		if(isset($response->resourceId) && $response->resourceId != NULL){
			$this->resourceId = $response->resourceId;
		}
		if(isset($response->description) && $response->description != NULL){
			$this->description = $response->description;
		}
		if(isset($response->sequence) && $response->sequence != NULL){
			$this->sequence = $response->sequence;
		}
		if(isset($response->periodId) && $response->periodId != NULL){
			$this->periodId = $response->periodId;
		}
		if(isset($response->bucketShowLevel) && $response->bucketShowLevel != NULL){
			$this->bucketShowLevel = $response->bucketShowLevel;
		}
		if(isset($response->bucketReportMethod) && $response->bucketReportMethod != NULL){
			$this->bucketReportMethod = $response->bucketReportMethod;
		}
		if(isset($response->hoursInPeriodType) && $response->hoursInPeriodType != NULL){
			$this->hoursInPeriodType = $response->hoursInPeriodType;
		}
		if(isset($response->allowMultipleTimeSheets) && $response->allowMultipleTimeSheets != NULL){
			$this->allowMultipleTimeSheets = $response->allowMultipleTimeSheets;
		}
		if(isset($response->notifyDelinquentTimeSheet) && $response->notifyDelinquentTimeSheet != NULL){
			$this->notifyDelinquentTimeSheet = $response->notifyDelinquentTimeSheet;
		}
		if(isset($response->reqActivitiesRequiredFlag) && $response->reqActivitiesRequiredFlag != NULL){
			$this->reqActivitiesRequiredFlag = $response->reqActivitiesRequiredFlag;
		}
		if(isset($response->tskActivitiesRequiredFlag) && $response->tskActivitiesRequiredFlag != NULL){
			$this->tskActivitiesRequiredFlag = $response->tskActivitiesRequiredFlag;
		}
		if(isset($response->prjActivitiesRequiredFlag) && $response->prjActivitiesRequiredFlag != NULL){
			$this->prjActivitiesRequiredFlag = $response->prjActivitiesRequiredFlag;
		}
		if(isset($response->pkgActivitiesRequiredFlag) && $response->pkgActivitiesRequiredFlag != NULL){
			$this->pkgActivitiesRequiredFlag = $response->pkgActivitiesRequiredFlag;
		}
		if(isset($response->miscActivitiesRequiredFlag) && $response->miscActivitiesRequiredFlag != NULL){
			$this->miscActivitiesRequiredFlag = $response->miscActivitiesRequiredFlag;
		}
		if(isset($response->reqWorkItemEnabledFlag) && $response->reqWorkItemEnabledFlag != NULL){
			$this->reqWorkItemEnabledFlag = $response->reqWorkItemEnabledFlag;
		}
		if(isset($response->tskWorkItemEnabledFlag) && $response->tskWorkItemEnabledFlag != NULL){
			$this->tskWorkItemEnabledFlag = $response->tskWorkItemEnabledFlag;
		}
		if(isset($response->prjWorkItemEnabledFlag) && $response->prjWorkItemEnabledFlag != NULL){
			$this->prjWorkItemEnabledFlag = $response->prjWorkItemEnabledFlag;
		}
		if(isset($response->pkgWorkItemEnabledFlag) && $response->pkgWorkItemEnabledFlag != NULL){
			$this->pkgWorkItemEnabledFlag = $response->pkgWorkItemEnabledFlag;
		}
		if(isset($response->mscWorkItemEnabledFlag) && $response->mscWorkItemEnabledFlag != NULL){
			$this->mscWorkItemEnabledFlag = $response->mscWorkItemEnabledFlag;
		}
		if(isset($response->enforcementLevelError) && $response->enforcementLevelError != NULL){
			$this->enforcementLevelError = $response->enforcementLevelError;
		}
		if(isset($response->state) && $response->state != NULL){
			$this->state = new PPM_Bean_Status($response->state->code);
			$this->state = $this->state->toArray();
		}
		if(isset($response->timeSheetLines) && $response->timeSheetLines != NULL){
			//var_dump($response->timeSheetLines);exit();
			if(is_array($response->timeSheetLines)){
				foreach($response->timeSheetLines as $timeSheetLine){
					$line = new PPM_Bean_TimeSheetLine($timeSheetLine);
					$line->getDescription();
					$this->timeSheetLines[] = $line->toArray();
				}
			} else {
				$line = new PPM_Bean_TimeSheetLine($response->timeSheetLines);
				$line->getDescription();
				$this->timeSheetLines[] = $line->toArray();
			}

		}
	}

	public function setResourceId($resourceid){
		$this->resourceId = $resourceid;
	}

	public function getResourceId(){
		return $this->resourceId;
	}

	public function setPeriodId($periodId){
		$this->periodId = $periodId;
	}

	public function getPeriodId(){
		return $this->periodId;
	}
    
	public function setDescription($description){
		return $this->description = $description;
	}

	public function addLine(PPM_Bean_TimeSheetLine $line){
		$this->timeSheetLines[] = $line->toArray();
	}

	public function clearLines(){
		$this->timeSheetLines = array();
	}

    public function emptyLines(){
        $this->timeSheetLines =array();
    }

	public function setState($code = 0){
		$this->state = new PPM_Bean_Status($code);
		$this->state = $this->state->toArray();
	}

	public function getTimeSheetLines(){
		return $this->timeSheetLines;
	}
	public function toArray(){
		$response = get_object_vars($this);
		$response = array_filter($response);
		return $response;
	}

	public function generateRequest(){
		$vars = array();
		$vars[] = new SoapVar($this->resourceId, XSD_STRING, null, null, 'resourceId','http://mercury.com/ppm/tm/1.0');
		$vars[] = new SoapVar($this->periodId, XSD_STRING, null, null, 'periodId','http://mercury.com/ppm/tm/1.0');
		$vars[] = new SoapVar($this->timeSheetId, XSD_STRING, null, null, 'timeSheetId','http://mercury.com/ppm/tm/1.0');
		$vars[] = new SoapVar($this->description, XSD_STRING, null, null, 'description','http://mercury.com/ppm/tm/1.0');
		
        if(!empty($this->timeSheetLines)){
            foreach($this->timeSheetLines as $line){

                $v = array();

                if(isset($line['timeSheetLineId']) && $line['timeSheetLineId'] != null){
                    $v[] = new SoapVar($line['timeSheetLineId'],XSD_STRING,null,null,'timeSheetLineId','http://mercury.com/ppm/tm/1.0');
                }

                $v[] = new SoapVar($line['workItemId'],XSD_STRING,null,null,'workItemId','http://mercury.com/ppm/tm/1.0');
                if(isset($line['workItemSetId'])){
                    $v[] = new SoapVar($line['workItemSetId'],XSD_STRING,null,null,'workItemSetId','http://mercury.com/ppm/tm/1.0');
                }
                $v[] = new SoapVar($line['workItemType'],XSD_STRING,null,null,'workItemType','http://mercury.com/ppm/tm/1.0');

                if(isset($line['userDataBean']) && isset($line['userDataBean']['userData2'])){

                    $userDataBean = array();
                    $userDataBean[] = new SoapVar($line['userDataBean']['userData2'], XSD_STRING, null,null,'userData2', 'http://mercury.com/ppm/tm/1.0');
                    $userDataBean[] = new SoapVar($line['userDataBean']['visUserData2'], XSD_STRING, null,null,'visUserData2', 'http://mercury.com/ppm/tm/1.0');
                    if(isset($line['userDataBean']['userData3'])){
                        $userDataBean[] = new SoapVar($line['userDataBean']['userData3'], XSD_STRING, null,null,'userData3', 'http://mercury.com/ppm/tm/1.0');
                        $userDataBean[] = new SoapVar($line['userDataBean']['visUserData3'], XSD_STRING, null,null,'visUserData3', 'http://mercury.com/ppm/tm/1.0');
                    }

                    $v[] = new SoapVar($userDataBean, SOAP_ENC_OBJECT, null,null,'userDataBean','http://mercury.com/ppm/tm/1.0');
                }

                if(is_array($line['timeActualsList']) && key_exists(0, $line['timeActualsList']) && !key_exists('effortsList', $line['timeActualsList'][0])){
                    $line['timeActualsList'] = $line['timeActualsList'][0];
                }

                foreach($line['timeActualsList'] as $actualList){
                    $actualList = json_decode(json_encode($actualList),true);
                    if($actualList['totalsFlag'] !== 'false' && $actualList['totalsFlag'] == true){
                        continue;
                    }


                    $a = array();
                    $a[] = new SoapVar('false',XSD_STRING,null,null,'totalsFlag','http://mercury.com/ppm/tm/1.0');


                    foreach($actualList['effortsList'] as $effort){
                        $a[] = new SoapVar($effort, XSD_STRING,null,null,'effortsList','http://mercury.com/ppm/tm/1.0');
                    }


                    $v[] = new SoapVar($a, SOAP_ENC_OBJECT,null,null,'timeActualsList','http://mercury.com/ppm/tm/1.0');
                }




                $vars[] = new SoapVar($v, SOAP_ENC_OBJECT, null, null,'timeSheetLines','http://mercury.com/ppm/tm/1.0');
            }
        }

		return new SoapVar($vars, SOAP_ENC_OBJECT, null,null,'timeSheetBean');
	}
}
