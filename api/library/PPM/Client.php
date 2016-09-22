<?php
class PPM_Client {
	protected $_username;
	protected $_password;

	protected $_endpoint;
	protected $_wsdlFile;
	protected $_soapClient;

	protected $_proxySettings = array(
		'useProxy' => false,
		'host' => '',
		'port' => '',
	);

	public function __construct($config){

		$this->_wsdlFile = __DIR__ . '\Wsdl\SI_AMSToolsTimesheets_Sender.wsdl';

		if(is_array($config)){
			if(array_key_exists('username')){
				$this->setUsername($config['username']);
			}

			if(array_key_exists('password')){
				$this->setPassword($config['password']);
			}

			if(array_key_exists('wsdlFile')){
				$this->setWsdlFile($config['wsdlFile']);
			}

			if(array_key_exists('endpoint')){
				$this->setEndpoint($config['endpoint']);
			}

			if(array_key_exists('useProxy') && true === $config['useProxy']){
				$this->setProxySettins($config['proxyHost'],$config['proxyPort']);
			}
		}
	}

	protected function _getOptions(){

		$context = stream_context_create(array(
		    'ssl' => array(
				'verify_peer' => false,
				'allow_self_signed' => true)
		));

		return array('login' => $this->_username,
					 'password' => $this->_password,
				     'proxy_host' => '3.211.64.24',
					 'proxy_port' => '80',
					 'cache_wsdl' => WSDL_CACHE_NONE,
					 'stream_context' => $context);
	}

	public function getClient(){
		if(null === $this->_soapClient){
			//create new
			$this->_soapClient = new SoapClient($this->_wsdlFile,$this->_getOptions());
		}

		return $this->_soapClient;
	}

	public function getUsername(){
		return $this->_username;
	}

	public function getPassword(){
		return $this->_password;
	}


	public function getEndpoint(){
		return $this->_endpoint;
	}

	public function getWsdlFile(){
		return $this->_wsdlFile;
	}

	public function setUsername($username){
		$this->_username = $username;
		return $this;
	}

	public function setPassword($password){
		$this->_password = $password;
		return $this;
	}

	public function setEndpoint($endpoint){
		$this->_endpoint = $endpoint;
		return $this;
	}

	public function setWsdlFile($wsdlFile){
		$this->_wsdlFile = $wsdlFile;
		return $this;
	}

	public function setProxySettings($host, $port){
		$this->_proxySettings['host'] = $host;
		$this->_proxySettings['port'] = $port;

		return $this;
	}

}