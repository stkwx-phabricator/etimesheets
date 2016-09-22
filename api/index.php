<?php
// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH',
realpath(__DIR__ . '/application')
);

// Define application environment
$hosts = parse_ini_file(APPLICATION_PATH . '/configs/hosts.ini', true);
$host = array_search($_SERVER['HTTP_HOST'], $hosts['DNS']);
defined('APPLICATION_ENV') || define('APPLICATION_ENV', $host);

// Define if running a debug instance
defined('DEBUG') || define('DEBUG',
    preg_match('/local/', APPLICATION_ENV)
);


// Include Zend Framework
require_once 'phar://library/Zend.phar';

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
realpath(APPLICATION_PATH . '/../library'),
get_include_path(),
)));

/**
 * @see Zend_Application
 */
require_once 'Zend/Application.php';

// Create and bootstrap the application
$application = new Zend_Application(
APPLICATION_ENV,
APPLICATION_PATH . '/configs/application.ini'
);

// Bootstrap resources and run application
$application->bootstrap()->run();
