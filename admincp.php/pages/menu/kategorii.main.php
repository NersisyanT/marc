<?php
/*
  !!!НЕ РЕДАКТИРУЙТЕ ДАННЫЙ ФАЙЛ!!! Он будет пересоздан при внесении изменений в разделе "Быстрое создание разделов"
*/

$links["Kategorii"]["cat"][] = array(
"link" => "#",
"title" => "{L_\"Категории\"}",
"type" => "cat",
"access" => db::connected(),
"icon" => "fa-chain",
);
$links["Kategorii"]["item"][] = array(
"link" => "{C_default_http_host}{D_ADMINCP_DIRECTORY}/?pages=Archer&type=kategorii",
"title" => "{L_\"Категории\"}",
"type" => "item",
"access" => db::connected(),
"icon" => "",
);
?>