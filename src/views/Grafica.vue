<template>
  <div class="small">
    
    <div v-if="carga===false">
     
    <chart v-for="encuesta in grafica" :key="encuesta.pregunta" :pregunta="encuesta.pregunta" :respuestas="encuesta.respuestas" :totalRespuesta="encuesta.totalRespuesta" > </chart>
    </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import chart from '@/components/Chart.vue'

export default {
  name:'grafica',
  created(){
    this.resetResultados()
    this.consulta(this.$route.params.id)
  },
  components: {
      chart
    },
    methods: {
      ...mapActions('graficas',['consulta']),
       ...mapMutations('graficas',['resetResultados']),   
       ...mapActions('graficas',['consulta']),   
    },
     computed: {
      ...mapGetters('graficas',{grafica:'grafica'}),
      ...mapGetters('graficas',{carga:'carga'})
      
  },

}
</script>