<?php
if(!defined("IS_CORE")) {
	echo "403 ERROR";
	die();
}

$adminCore = array_merge($adminCore, array(
	"CoreDataTables.php" => true,
	"CoreMainChange.php" => true,
	"CoreUikit.php" => true,
	"CoreSelect2.php" => true,
	"CoreXEditable.php" => true,
));

?>