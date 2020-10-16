<template>
  <v-app>
    <v-main>
      <TopBar></TopBar>
       <router-view  />
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar';

export default {
  name: 'App',

  components: {
    TopBar,
  },

  data: () => ({
    //
  }),
};
</script>
