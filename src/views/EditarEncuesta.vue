<template>
    <div>
         <v-container>
        <div class="headline"  style=" color: #004cac; font-weight: 700; ">
                      <h2>  Editar Encuesta </h2>
                    </div>
               
            
            <v-subheader>Informacion de Encuesta</v-subheader>
             <InfoEncuesta></InfoEncuesta>

             <v-subheader>Preguntas de Examen</v-subheader>
    <v-col cols="6">
        <v-select
         v-model="tipo"
          :items="items"
          label="Solo field"
          solo
          :value="tipo"
        ></v-select>
     </v-col>
        <Preguntas :tipoPregunta="tipo" ></Preguntas>
        <AccionEncuesta :accion="EditarEncuesta" accionName="Editar"></AccionEncuesta>
        
    
        </v-container>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import InfoEncuesta from '@/components/InfoEncuesta'
import Preguntas from '@/components/Preguntas'
import AccionEncuesta from '@/components/AccionEncuesta'
export default {
    name: 'editar-encuesta',
    data(){
        return{
            items: ['Opción única', 'Opción múltiple', 'Formato texto'],
            tipo: ''
        }
        
        
    },
     created(){
             this.getEncuesta(this.$route.params.id)
            
    },
    mounted(){
        
        this.tipo = this.encuesta.tipo
        
    },
    components: {
        InfoEncuesta,
        Preguntas,
        AccionEncuesta
    },
    methods: {
        ...mapMutations('encuesta',['resetPreguntas','actualizarTipo']),
        ...mapActions('encuesta',['actualizarEncuesta','getEncuesta']),

        async EditarEncuesta(){
             try {
                 
         let validacion = await this.actualizarEncuesta(this.$route.params.id);
        //console.log(validacion)
         if(validacion===false){
             this.$router.push('/Dashboard');
         }
          
        } catch(error) {
          alert('Ocurrio algun error');
        }
        }

    },
    computed:{
         ...mapGetters('encuesta',{encuesta:'nuevaEncuesta'})
    },
    
     watch: {
    
    tipo: function (){
        console.log(this.tipo)
        if(this.tipo=='Formato texto')
        {
            let datos= {
                titulo: this.encuesta.titulo,
                descripcion: this.encuesta.descripcion
            }
            this.resetPreguntas(datos)
            this.actualizarTipo(this.tipo)
        }else{
            this.actualizarTipo(this.tipo)
        }
        
     }
    }
}
</script>