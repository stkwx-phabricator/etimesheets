<?php
/**
 * GE Capital HQ Commercial Media | Genius 3.0
 *
 * Copyright (c) 2013 General Electric Company
 *
 * This file contains GE CONFIDENTIAL Information
 * Use, disclosure or reproduction is prohibited.
 *
 * @version   SVN $Revision$
 * @author    GE Company / GE Capital Genius 3.0
 * @copyright Copyright (c) 2013 General Electric Company
 */

class ErrorController extends Zend_Controller_Action
{

    public function apiAction()
    {        
        
    }

    public function errorAction()
    {
        $errors = $this->_getParam('error_handler');

        if (!$errors || !$errors instanceof ArrayObject) {
            $this->view->message = 'You have reached the error page';
            return;
        }

        switch ($errors->type) {
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                // 404 error -- controller or action not found
                $this->getResponse()->setHttpResponseCode(404);
                $priority = Zend_Log::NOTICE;
                $this->view->message = 'Page not found';
                break;
            default:
                // application error
                $this->getResponse()->setHttpResponseCode(500);
                $priority = Zend_Log::CRIT;
                $this->view->message = 'Application error';
                break;
        }

        // Log exception, if logger available
        if ($log = $this->getLog()) {
            $log->log($this->view->message, $priority, $errors->exception);
            $log->log('Request Parameters', $priority, $errors->request->getParams());
        }

        // conditionally display exceptions
        if ($this->getInvokeArg('displayExceptions') == true) {
            $this->view->exception = $errors->exception;
        }

        $this->view->request   = $errors->request;
    }

    public function getLog()
    {
        $bootstrap = $this->getInvokeArg('bootstrap');
        if (!$bootstrap->hasResource('Log')) {
            return false;
        }
        $log = $bootstrap->getResource('Log');
        return $log;
    }
    
    public function maintenanceAction()
    {
    	if($this->_request->isXmlHttpRequest()){
      		$this->_helper->viewRenderer->setNoRender();
    	}
    }
    
    public function unauthorizedAction()
    {
    	if($this->_request->isXmlHttpRequest()){
      		$this->_helper->viewRenderer->setNoRender();
    	}
        
        try{
            $crmName = Api_Model_Business::getInstance()->getCrmName();
            $this->_helper->getHelper('Redirector')->gotoUrlAndExit('/');
        }catch(Exception $e){
            
        }
    }

}

