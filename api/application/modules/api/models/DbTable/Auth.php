<?php
class Api_Model_DbTable_Auth extends Zend_Db_Table{
	protected $_name = 'auth';

	public function generateToken($username){
		return hash('sha256', uniqid($username));
	}

	public function getByToken($token){
		$query = $this->select(false)
		->from('auth',array('id','username','token','token_lastuse','token_issued', 'token_expire', 'resourceId', 'is_approver'))
		->where('token = ?', $token)
		->where('token_expire > NOW()');

		$row = $this->fetchRow($query);

		return $row;
	}
}