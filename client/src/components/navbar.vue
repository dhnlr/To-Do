<template>
	<nav class="level navbar is-fixed-top is-warning">
	  <p class="level-item has-text-centered">
	    <router-link :to="{ path: 'home' }">Home</router-link>
	  </p>
	  <p class="level-item has-text-centered">
	    <router-link to="/about">About</router-link>
	  </p>
	  <p class="level-item has-text-centered">
	    <img src="http://dl.hiapphere.com/data/icon/201609/HiAppHere_com_io.tinbits.memorigi.png" alt="" style="height: 30px;">
	  </p>
	  <p class="level-item has-text-centered">
	    <router-link to="/contact">Contact</router-link>
	  </p>
	  <p class="level-item has-text-centered">
	    <router-link to="/login" class="button is-link is-rounded">Getting Started</router-link>
	  </p>
	</nav>
</template>

<script>
export default {

  name: 'navbar',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
a {
	font-color: black !important;
}
</style>