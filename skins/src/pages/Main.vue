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