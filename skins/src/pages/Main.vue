<template>
    <section class="scrollme first-section">
        <div class="main_parallax"></div>
        <div class="parallax-component_image">
            <div  class="animateme wow fadeIn" data-when="span" data-from="0" data-to="0.3" data-easing="easeinout" data-opacity="0" data-scale="0.95" data-wow-duration="1000ms" data-wow-delay="0ms" style="opacity: 0; visibility: hidden;">
                <div class="logo">
                    <span>
                        Marc Jacobs
                    </span>
                </div>
                <ul>
                    <li>Оригинал</li>
                    <li>|</li>
                    <li>В наличии</li>
                    <li>|</li>
                    <li>Бесплатная доставка</li>
                </ul>
            </div>
        </div>
    </section>
    <section class="production" id="product" data-section="product">
        <span class="title" data-aos-offset="200" data-aos="fade-left">Оригинальные сумки</span>
        <span class="descr">Из аутлетов США и Европы</span>
        <span class="back" data-aos-offset="200" data-aos="fade-right">Сумки</span>
        <div class="content">
            <div class="filter_buttons" style="display:none;">
                <span class="button filter-clear hidden">Сбросить</span>
                <span class="button filter_button">Фильтр</span>
            </div>
            <div class="filter_container">
                <div class="filter">
                        <span class="filter_title">Каталог</span>
                    <div class="categories container">
                    </div>
                    <div class="price container">
                        <span class="cont-header">
                            <span class="attr_header sliding_header">
                                По цене
                            </span>
                        </span>
                        <div class="sliding_container">
                            <div class="price_slider_container sliding_header" id="slider-range"></div>
                            <div class="current_symb sliding_header">
                                <div class="from">
                                    <input type="text" id="amount" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="attributes container">
                    </div>
                    <span class="filter-clear">Очистить</span>
                </div>
                    <div class="filter-buttons">
                        <div class="filter-close"><span>Свернуть</span></div>
                        <div class="filter-apply"><span>Применить</span></div>
                    </div>
            </div>
            <div class="product_container">
                <div class="prod-block">
                    [foreach block=prod]
                    <div id="rec5611528{prod.tId}" class="prod r js-product {prod.class}" data-prodid="{prod.tId}" data-product-lid="{prod.tId}" onclick="void(0)">
                        [foreachif {prod.tSkidka}>0]<span class="sale">-{prod.tSkidka}%</span>[/foreachif {prod.tSkidka}>0]
                        [if {prod.Teg} != null]
                        <span class="tag" data-tag="{prod.Teg}">{prod.Teg}</span>
                        [/if {prod.Teg} != null]
                        <div class="add_to_wish"></div>
                        <div class="image">
                            <div class="js-product-img"  style="background-image: url({prod.tIzobrazhenie})"></div>
                            <a class="descr" data-id="{prod.tId}" href="/product-{prod.tId}"></a>
                            <!-- <span class="buy"></span> -->
                            <a class="buy" href="#order"></a>                            
                        </div>
                        <div class="text">
                            <span class="name js-product-name" field="li_title__2">{prod.tNazvanie}</span>
                            [foreachif {prod.tSkidka}==0]<div class="prc"><span class="price js-product-price" field="li_price__2">{prod.tCena} грн</span></div>[/foreachif {prod.tSkidka}==0]
                            [foreachif {prod.tSkidka}>0]<div class="prc"><span class="price js-product-price_old" field="li_price__2">{prod.tCena} грн</span><span class="price js-product-price" field="li_price__2">{prod.tSprice} грн</span></div>[/foreachif {prod.tSkidka}>0]
                        </div>
                    </div>
                    [/foreach]
                </div>
                <div class="prod-block sale-block" style="display: none">
                    [foreach block=prodsale]
                    <div id="rec5611528{prodsale.tId}" data-aos="fade-up" class="prod r js-product" data-prodid="{prodsale.tId}" data-product-lid="{prodsale.tId}" onclick="void(0)">
                        [foreachif {prodsale.tSkidka}>0]<span class="sale">-{prodsale.tSkidka}%</span>[/foreachif {prodsale.tSkidka}>0]
                        <div class="add_to_wish"></div>
                        <div class="image">
                            <div class="js-product-img"  style="background-image: url({prodsale.tIzobrazhenie})"></div>
                            <span class="descr" data-id="{prodsale.tId}"></span>
                            <!-- <span class="buy"></span> -->
                            <a class="buy" href="#order"></a>                            
                        </div>
                        <div class="text">
                            <span class="name js-product-name" field="li_title__2">{prodsale.tNazvanie}</span>
                            [foreachif {prodsale.tSkidka}==0]<div class="prc"><span class="price js-product-price" field="li_price__2">{prodsale.tCena} грн</span></div>[/foreachif {prodsale.tSkidka}==0]
                            [foreachif {prodsale.tSkidka}>0]<div class="prc"><span class="price js-product-price_old" field="li_price__2">{prodsale.tCena} грн</span><span class="price js-product-price" field="li_price__2">{prodsale.tSprice} грн</span></div>[/foreachif {prodsale.tSkidka}>0]
                        </div>
                    </div>
                    [/foreach]
                </div>
                <button>Показать еще</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                images: {
                    image: require('@/img/back2.jpg')
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/pages/main.scss';
</style>