<?php
if(!defined("IS_CORE")) {
echo "403 ERROR";
die();
}

if(!defined("PREFIX_DB")) {
	define("PREFIX_DB", "cardinal_");
}

$config = array_merge($config, array(
	"db" => array(
		"host" => "localhost",
		"port" => "3306",
		"user" => "root",
		"pass" => "root",
		"db" => "tigran_jacobs",
		"charset" => "utf8",
		"driver" => "db_mysqli",
	),
));

?>