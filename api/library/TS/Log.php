<?php
class TS_Log{
	const EMERG   = 0;  // Emergency: system is unusable
	const ALERT   = 1;  // Alert: action must be taken immediately
	const CRIT    = 2;  // Critical: critical conditions
	const ERR     = 3;  // Error: error conditions
	const WARN    = 4;  // Warning: warning conditions
	const NOTICE  = 5;  // Notice: normal but significant condition
	const INFO    = 6;  // Informational: informational messages
	const DEBUG   = 7;  // Debug: debug messages

	static $MAP = array(
	self::EMERG   => 'EMERG',
	self::ALERT   => 'ALERT',
	self::CRIT    => 'CRIT',
	self::ERR     => 'ERR',
	self::WARN    => 'WARN',
	self::NOTICE  => 'NOTICE',
	self::INFO    => 'INFO',
	self::DEBUG   => 'DEBUG');

	public static function log($e, $level = 7, $info = null){
		if(Zend_Registry::isRegistered("logger")){
			$logger = Zend_Registry::get("logger");
			$logger->log(($e instanceof Exception)?$e->getMessage():(string) $e, $level, $info);
			if($info != null){
				$logger->log((string)$info, $level);
			}
		}
	}
}