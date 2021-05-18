<?php
/*
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

$links["Tovary"]["cat"][] = array(
"link" => "#",
"title" => "{L_\"Товары\"}",
"type" => "cat",
"access" => db::connected(),
"icon" => "fa-shopping-cart",
);
$links["Tovary"]["item"][] = array(
"link" => "{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Archer&type=tovary",
"title" => "{L_\"Товары\"}",
"type" => "item",
"access" => db::connected(),
"icon" => "",
);
?>