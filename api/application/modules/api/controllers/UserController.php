<?php

class UserController extends Zend_Rest_Controller
{
	protected $_model;
	protected $_userId;

	public function init()
	{
		$this->_model = new Api_Model_DbTable_Auth();
	}

	public function indexAction()
	{
		$token = $this->getRequest()->getHeader('Authorization');

		if(preg_match('/Token ([0-9A-Za-z]{64})/',$token,$matches)){
			$auth = $this->_model->getByToken($matches[1]);

			if(null !== $auth){
				$this->view->resource = $auth->toArray();
				return ;
			}
		}

		$this->view->resource = 'Access Denied';
		$this->getResponse()->setHttpResponseCode(403);

	}

	public function getAction(){
		$this->view->resource = 'Not Implemented';
		$this->getResponse()->setHttpResponseCode(501);
	}

	public function postAction(){

		$form = new Api_Model_Form_Auth();
		//by default set error message
		$this->view->resource = 'Incorrect Username or Password';
		$this->getResponse()->setHttpResponseCode(422);


		//if form is not valid exit and stop
		if(!$form->isValid($this->_getAllParams())){
			return ;
		}
		//verify credentials
		try{
			$auth = PPM_Api::stkAuthenticateUser(
			array('userName'=>$form->getValue('username'),
				  'password'=>$form->getValue('password')));
		}
		catch(Exception $e){
			TS_Log::log('Auth Fail',TS_Log::ERR);
			return;
		}

		if(false === $auth){
			return;
		}

		try{
			$resourceId = PPM_Api::getResourceId($form->getValue('username'));
		}
		catch(Exception $e){
			return;
		}

		if(null == $resourceId){
			TS_Log::log('Resource Id Not Found',TS_Log::ERR);
			return;
		}

        $is_approver = 0;

        try {
            $is_approver = PPM_Api::isTimesheetApprover($resourceId);
        }
		catch (Exception $ex) {

        }

		$this->getResponse()->setHttpResponseCode(200);

		$auth = $this->_model->createRow();

		$auth->username = $username;
		$auth->token = $this->_model->generateToken($username);
		$auth->token_issued = new Zend_Db_Expr('NOW()');
		$auth->token_lastuse = new Zend_Db_Expr('NOW()');
		$auth->token_expire = new Zend_Db_Expr('DATE_ADD(NOW(),INTERVAL 30 MINUTE)');

		$auth->resourceId = $resourceId;

        $auth->is_approver = $is_approver;

        $auth->save();

        $this->view->resource = $auth->toArray();


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
