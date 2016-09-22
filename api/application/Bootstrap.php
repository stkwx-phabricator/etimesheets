<?php

/**
 * Concrete class to bootstrap the application
 *
 *  Initializes the components in the configuration and inits resources that'll
 * be utilized by the rest of the application
 */
final class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	/**
	 * Inits RESTful module
	 */
	protected function _initREST()
	{
		// Get Zend Front-controller
		$frontController = Zend_Controller_Front::getInstance();
		// Set custom request object
		$frontController->setRequest(new REST_Controller_Request_Http);
		$frontController->setResponse(new REST_Response);
		// Add the REST route for the API module only
		$restRoute = new Zend_Rest_Route($frontController, array(), array('api'));
		$frontController->getRouter()->addRoute('api', $restRoute);
		
		$frontController->getRouter()->addRoute(
                'index',
		new Zend_Controller_Router_route('api/index',
		array('module' => 'api',
                              'controller' => 'index',
                              'action' => 'get')));
	}

	protected function _initPpm(){
		$ppmOptions = new Zend_Config($this->getOption("ppm"));
		PPM_Api::init($ppmOptions->toArray());
		PPM_ToolsRequests::init($ppmOptions->toArray());
	}

	protected function _initLog(){
		$options = $this->getOption('resources');

		$partitionConfig = $this->getOption('log');
		$logOptions = $options['log'];

		$baseFilename = $partitionConfig['path'];

		$logFilename =sprintf("%s%s_log.log",$baseFilename, date('Ymd'));
		$logOptions['stream']['writerParams']['stream'] = $logFilename;

		$logger = Zend_Log::factory($logOptions);
		Zend_Registry::set('logger', $logger);

		return $logger;
	}

}


