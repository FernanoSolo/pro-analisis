<template>
    <div>
        <v-container>

             <v-row dense justify="center" v-if="encuestas">

        <CardEncuesta  v-for="encuesta in encuestas" :key="encuesta.id" :titulo="encuesta.titulo" :descripcion="encuesta.descripcion" :id="encuesta.id" :tipo="encuesta.tipo" :estado="encuesta.estado" ></CardEncuesta>
            </v-row>
        </v-container>
            <v-btn fab dark fixed right large bottom color="indigo" to='/Dashboard/Crear' class="mx-4" name="nueva-encuesta" >
            <v-icon>mdi-plus</v-icon>
         </v-btn>
      
    </div>
</template>

<script>

import {  mapGetters, mapActions, mapMutations} from 'vuex'
import CardEncuesta from '@/components/CardEncuesta'

export default {
    name: 'dashboard',
    created(){
        this.listarEncestas()
        this.resetEncuesta()    
        
    },
    components:{
      CardEncuesta
  },
  computed: {
      ...mapGetters('encuesta',{encuestas:'lista'})
  },
  methods:{
       ...mapActions('encuesta',['listarEncestas']),
       ...mapMutations('encuesta',['resetEncuesta']),      
        
  }
}
</script>