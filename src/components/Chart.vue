

<script>
import { Bar } from 'vue-chartjs'
 import {mapState} from 'vuex'
export default {
  extends: Bar,
 props: [ 'pregunta', 'respuestas', 'totalRespuesta' ],
 data(){
   return{
    
   }
 },
  mounted () {
    // Overwriting base render method with actual data.
  
    this.renderChart({
      responsive: true,
      labels: this.respuestas,
      datasets: [
        {
          label: this.pregunta,
          backgroundColor: '#f87979',
          data:this.totalRespuesta
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