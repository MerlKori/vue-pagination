<template>
	<div id="app">
		<h3>current page {{currentPage}}</h3>
		<Pagination
			v-model="currentPage"
			:pagesList="generatePagesList" />
	</div>
</template>

<script>
import Pagination from './components/Pagination.vue'

export default {
	name: 'app',
	components: {
		Pagination
	},
	data: () => ({
		currentPage: 1
	}),
	computed: {
		generatePagesList () {
			return Array.from({length: 50}, (value, idx) => idx + 1);
		}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
