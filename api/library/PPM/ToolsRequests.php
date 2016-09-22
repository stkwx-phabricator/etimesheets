<?php
class PPM_ToolsRequests{
	protected $_username;
	protected $_password;

	protected $_endpoint;
	protected $_wsdlFile;
	protected $_soapClient;

	public static $_instance = null;

	protected $_proxySettings = array(
		'useProxy' => false,
		'host' => '',
		'port' => '',
	);

	public function __construct($config = array()){

		$this->_wsdlFile = __DIR__ . '/Wsdl/SI_AMSToolsRequests_Sender.wsdl';

		if(is_array($config)){
			if(array_key_exists('username',$config)){
				$this->setUsername($config['username']);
			}
			if(array_key_exists('password',$config)){
				$this->setPassword($config['password']);
			}

			if(array_key_exists('wsdlFile',$config)){
				$this->setWsdlFile($config['wsdlFile']);
			}

			if(array_key_exists('dm_endpoint',$config)){
				$this->setEndpoint($config['dm_endpoint']);
			}

			if(array_key_exists('use_proxy',$config) && true == $config['use_proxy']){
				$this->setProxySettings(true, $config['proxy_host'],$config['proxy_port']);
			}
		}
	}


	public static function init($options){
		self::$_instance =  new self($options);
	}

	public static function getInstance(){
		return self::$_instance;
	}

	protected function _getOptions(){

		$context = stream_context_create(array(
		    'ssl' => array(
				'verify_peer' => false,
				'allow_self_signed' => true)
		));

		$options = array('login' => $this->_username,
					 'password' => $this->_password,
					 'cache_wsdl' => WSDL_CACHE_NONE,
					 'stream_context' => $context,
					 'trace' => true);

		if($this->_proxySettings['useProxy']){
			$options['proxy_host'] = $this->_proxySettings['host'];
			$options['proxy_port'] = $this->_proxySettings['port'];
		}

		return $options;
	}

	public function getClient(){
		if(null === $this->_soapClient){
			//create new
			$this->_soapClient = new SoapClient($this->_wsdlFile,$this->_getOptions());
			$this->_soapClient->__setLocation($this->_endpoint);
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

	public function setProxySettings($useProxy, $host, $port){
		$this->_proxySettings['useProxy'] = $useProxy;
		$this->_proxySettings['host'] = $host;
		$this->_proxySettings['port'] = $port;

		return $this;
	}
}