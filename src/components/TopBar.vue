<template>
    <div>
          <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Analisis 2</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
         <v-btn icon class="ml-5" to="/Dashboard">
        
          <v-list-item-title>Dashboard</v-list-item-title>
      </v-btn>
            
         
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  
    </div>
</template>

<script>
export default {
    name: 'nav-bar',
     data: () => ({
      drawer: false,
      group: null,
    }),
}
</script>