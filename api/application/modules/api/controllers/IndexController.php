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

class IndexController extends Zend_Rest_Controller
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {    	
        $this->view->resource = array('test'=>'test');
    }

    public function headAction(){
    }
    
    public function getAction(){
        
    }
    public function postAction(){
        
    }
    public function putAction(){
        
    }
    public function deleteAction(){
        
    }


}
