<template>
	<Header></Header>
	<router-view/>
</template>

<script>

import Header from './components/Header.vue';
export default {
	name: 'App',
		components: {
			Header,
	}
}
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
    @import './scss/components/default.scss';
</style>