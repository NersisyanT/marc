<?php
if(!defined("IS_CORE")) {
	echo "403 ERROR";
	die();
}

$modulesLoad = array_merge($modulesLoad, array(
"application".DS."modules".DS."TegiArcher.class.".ROOT_EX => true,
"application".DS."modules".DS."AtributyArcher.class.".ROOT_EX => true,
"application".DS."modules".DS."KategoriiArcher.class.".ROOT_EX => true,
"application".DS."modules".DS."ZakazyArcher.class.".ROOT_EX => true,
"application".DS."modules".DS."modpro.class.".ROOT_EX => true,
"application".DS."modules".DS."TovaryArcher.class.".ROOT_EX => true,
"application".DS."modules".DS."smsc.class.".ROOT_EX => true,
	"application".DS."modules".DS."base.class.".ROOT_EX => true,
	"application".DS."modules".DS."mobile.class.".ROOT_EX => true,
	"application".DS."modules".DS."changelog.class.".ROOT_EX => true,
	"application".DS."modules".DS."installerAdmin.class.".ROOT_EX => true,
	"application".DS."modules".DS."changeLangOnSite.class.".ROOT_EX => true,
));

?>