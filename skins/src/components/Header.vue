<template>
    <header class="header">
        <div class="contact">
            <div class="block">
                <div class="left">
                    <span class="text">Связаться с нами</span>
                    <div class="phones">
                        <a href="tel:+380973301212">+38 097 330 12 12</a>
                    </div>
                    <div class="time">
                        ПН-ВС 9.00 - 22.00
                    </div>
                </div>
                <div class="right">
                    <div class="search">
                        <span>Поиск...</span>
                    </div>
                    <div class="open_wishlist">
                        <div class="icon"></div>
                        <span>(<span class="count">0</span>)</span>
                    </div>
                    <div class="cart">
                        <span class="text">Товаров в корзине</span>
                        <span class="count-cart">(0)</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-block">
            <a href="/" class="logo"></a>
            <ul>
                <li>
                    <a class="active collection" href="/">Каталог товаров</a>
                </li>
                <li>
                    <a href="{C_default_http_host}about-us">О нас</a>
                </li>
                <li>
                    <a href="{C_default_http_host}delivery">Доставка и оплата</a>
                </li>
                <li>
                    <a class="not_link callback_link" href="{C_default_http_host}#callback" data-anchor="callback">Оставить заявку</a>
                </li>
                <li>
                    <a href="{C_default_http_host}contacts">Контакты</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    @import '../scss/components/header.scss';
</style>