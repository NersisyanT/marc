<?php
define("IS_CORE", true);
require_once("core.php");

$sql = file_get_contents(ROOT_PATH."sqls.txt", true);
$sql = explode(PHP_EOL, $sql);
for($i=0;$i<sizeof($sql);$i++) {
	db::doquery($sql[$i]);
	if(($i%10)==1) {
		sleep(1);
	}
}

