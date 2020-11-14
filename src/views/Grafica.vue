<template>
  <div class="small">
    <chart v-for="encuesta in resultados" :key="encuesta.pregunta" :pregunta="encuesta.pregunta" :respuestaSeleccionada="encuesta.respuestaSeleccionada" > </chart>
    {{ resultados.pregunta }}
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import chart from '@/components/Chart.vue'

export default {
  name:'grafica',
  created(){
    this.resetResultados()
    this.consulta()
  },
  components: {
      chart
    },
    methods: {
      ...mapActions('graficas',['consulta']),
       ...mapMutations('graficas',['resetResultados']),      
    },
     computed: {
      ...mapGetters('graficas',{resultados:'resultados'})
  },

}
</script>