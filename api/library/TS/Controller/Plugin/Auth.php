<?php

class TS_Controller_Plugin_Auth extends Zend_Controller_Plugin_Abstract
{

	public function preDispatch(Zend_Controller_Request_Abstract $request)
	{
		if($request->action ==='post' && $request->controller === 'user'){
			return ;
		}

		$token = $request->getHeader('Authorization');

		if(preg_match('/Token ([0-9A-Za-z]{64})/',$token,$matches)){
			$model = new Api_Model_DbTable_Auth();
			$user = $model->getByToken($matches[1]);
				
			if(null !== $user){
				Zend_Registry::set('APP_USER', $user);
				$user->token_lastuse = new Zend_Db_Expr('NOW()');
				$user->token_expire =  new Zend_Db_Expr('DATE_ADD(NOW(),INTERVAL 30 MINUTE)');
				$user->save();
				return ;
			}
		}

		$this->getResponse()
		->setHttpResponseCode(403)
		->setHeader('Content-Type', 'text/plain');

		$request->setModuleName('api')
		->setControllerName('error')
		->setActionName('access')
		->setDispatched(true);
		return ;

	}

}
