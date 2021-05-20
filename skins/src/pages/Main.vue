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
            {{mess}}
            <div class="product_container">
                <div class="prod-block">
                    <div class="prod" v-for="product in products" :key="product.id">
                        {{product.tNazvanie}}   
                    </div>
                </div> 
                <button>Показать еще</button>
            </div>
            <div class="test" v-for="item in items" v-bind:key="item.message">
                <span>{{item.message}}</span>
            </div>
        </div>
    </section>
</template>

<script>
    import Products from '../api/products.js';
    let prod = new Products;
    export default {
        data () {
            return{
                products: prod.getTodoItems(),
                mess: 'mess',
                items: [
                    { message: 'Foo' },
                    { message: 'Bar' }
                ]
            }
        },
    }
    console.log(prod.getTodoItems())
</script>

<style lang="scss">
    @import '../scss/pages/main.scss';
</style>