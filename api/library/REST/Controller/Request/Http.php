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

class REST_Controller_Request_Http extends Zend_Controller_Request_Http
{

    private $_error = false;

    public function setError($code, $message)
    {
        $this->_error = new stdClass;
        $this->_error->code = $code;
        $this->_error->message = $message;
        return $this;
    }

    public function getError()
    {
        return $this->_error;
    }

    public function hasError()
    {
        return false !== $this->_error;
    }

    public function getMethod()
    {
        if ($this->getParam('_method', false)) {
            return strtoupper($this->getParam('_method'));
        }
        if ($this->getHeader('X-HTTP-Method-Override')) {
            return strtoupper($this->getHeader('X-HTTP-Method-Override'));
        }
        return $this->getServer('REQUEST_METHOD');
    }

    public function dispatchError($code, $message)
    {
        $this->setError($code, $message);
        $this->setControllerName('error');
        $this->setActionName('error');
        $this->setDispatched(true);
    }

}
