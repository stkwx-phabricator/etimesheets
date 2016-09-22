<?php
class PPM_Api_GetItems extends PPM_Api {
	protected $_method = 'GetUserItems_SenderSync';
    protected $_client;
    
    function __construct() {
        parent::__construct();
        $this->_client = $this->getClient();
    }
    
    public function byUserId($UserID){
        return $this->_client->$this->_method($UserID);
    }
}