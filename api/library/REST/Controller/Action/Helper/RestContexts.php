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

class REST_Controller_Action_Helper_RestContexts extends Zend_Controller_Action_Helper_Abstract
{

    public function preDispatch()
    {
        $frontController = Zend_Controller_Front::getInstance();
        $currentMethod = $frontController->getRequest()->getMethod();
        $controller = $this->getActionController();
        if ($controller instanceOf Zend_Rest_Controller or $controller instanceOf REST_Controller) {
            $contextSwitch = $controller->getHelper('contextSwitch');
            $contextSwitch->setAutoSerialization(true);
            foreach ($this->getControllerActions($controller, $currentMethod) as $action) {
                $contextSwitch->addActionContext($action, true);
            }
            $contextSwitch->initContext();
        }
    }

    private function getControllerActions($controller, $currentMethod)
    {
        $class = new ReflectionObject($controller);
        $methods = $class->getMethods(ReflectionMethod::IS_PUBLIC);
        $actions = array();
        foreach ($methods as &$method) {
            $name = strtolower($method->name);
            if ($name == '__call') {
                $actions[] = strtolower($currentMethod);
            } elseif (substr($name, -6) == 'action') {
                $actions[] = str_replace('action', null, $name);
            }
        }
        return $actions;
    }

}
