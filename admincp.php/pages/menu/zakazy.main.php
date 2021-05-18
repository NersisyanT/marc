<?php
/*
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

$links["Zakazy"]["cat"][] = array(
"link" => "#",
"title" => "{L_\"Заказы\"}",
"type" => "cat",
"access" => db::connected(),
"icon" => "fa-credit-card",
);
$links["Zakazy"]["item"][] = array(
"link" => "{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Archer&type=zakazy",
"title" => "{L_\"Заказы\"}",
"type" => "item",
"access" => db::connected(),
"icon" => "",
);
?>