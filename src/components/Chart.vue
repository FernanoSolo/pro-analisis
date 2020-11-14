

<script>
import { Bar } from 'vue-chartjs'
 import {mapState} from 'vuex'
export default {
  extends: Bar,
 props: [ 'pregunta', 'respuestaSeleccionada' ],
 data(){
   return{
     preguntaClone: this.pregunta,
     respuestasClone: this.respuestaSeleccionada
   }
 },
  mounted () {
    // Overwriting base render method with actual data.
    console.log(this.respuestasClone)
     console.log(this.pregunta)
    
    this.renderChart({
      responsive: true,
      labels: this.respuestasClone,
      datasets: [
        {
          label: 'Respuestas',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 4, 40, 20, 12, 11]
        }
      ]
    })
  }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  auto;
  }
</style>