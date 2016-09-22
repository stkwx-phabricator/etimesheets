<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserDataBean
 *
 * @author fernando.medrano
 */
class PPM_Bean_UserDataBean {
	//put your code here
	protected $userData1        = NULL;
	protected $visUserData1     = NULL;
	protected $userData2        = NULL;
	protected $visUserData2     = NULL;
	protected $userData3        = NULL;
	protected $visUserData3     = NULL;

	public function __construct($param) {
		if(isset($param->userData1) && $param->userData1 != NULL){
			$this->userData1 = $param->userData1;
		}
		if(isset($param->userData2) && $param->userData2 != NULL){
			$this->userData2 = $param->userData2;
		}
		if(isset($param->userData3) && $param->userData3 != NULL){
			$this->userData3 = $param->userData3;
		}
		if(isset($param->visUserData1) && $param->visUserData1 != NULL){
			$this->visUserData1 = $param->visUserData1;
		}
		if(isset($param->visUserData2) && $param->visUserData2 != NULL){
			$this->visUserData2 = $param->visUserData2;
		}
		if(isset($param->visUserData3) && $param->visUserData3 != NULL){
			$this->visUserData3 = $param->visUserData3;
		}
	}

	public function setUserData2($value){
		$this->userData2 = $value;
		return $this;
	}

	public function setUserData3($value){
		$this->userData3 = $value;
		return $this;
	}

	public function setVisUserData2($value){
		$this->visUserData2 = $value;
		return $this;
	}

	public function setVisUserData3($value){
		$this->visUserData3 = $value;
		return $this;
	}

	public function toArray(){
		$response = get_object_vars($this);
		$response = array_filter($response);
		return $response;
	}
}
