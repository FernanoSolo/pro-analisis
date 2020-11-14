<template>
    <div>
        
        <br>
        <br>

  <v-card
   
    class="mx-4" elevation="10" max-width="320" 
  >
    <v-img
      class="white--text align-end"
      height="150px"
      src="https://img.unocero.com/2019/10/WhatsApp-encuestas-png.jpg"
    >
      
    </v-img>
<v-card-title>{{titulo}}</v-card-title>
<v-card-subtitle class="pb-0">
      {{descripcion}}
    </v-card-subtitle>
    
   

    <v-card-text class="mx-auto" >
      
      <v-col cols="12"  >
        Estado:
      <v-select
      class="ml-5 mr-6"
          v-model="estadoClone"
          :items="items"
          label="Solo field"
          solo
          @change="changeEstado"
        ></v-select>


      </v-col>

       </v-card-text>
       

    <v-card-actions   >
      <v-btn
        color="orange"
        text
        
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
        :to="`/Encuesta/${id}`"
        name="realizar-encuesta"
      >
        Realizar
      </v-btn>
      <v-btn
        color="orange"
        text
        :to="`/Editar/${id}`"
        name="editar-encuesta"
      >
        Editar
      </v-btn>
    </v-card-actions>
    
  </v-card>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'card-encuesta',
    props: [ 'titulo', 'descripcion', 'id','tipo','estado' ],
    data(){
      return{
        items: ['Deshabilitada', 'Activa',],
        estadoClone: this.estado
      }
    },
    methods: {
       ...mapActions('encuesta',['actualizarEstado']),
      changeEstado(){
        console.log(this.estadoClone)
        console.log(this.id)
        this.actualizarEstado({
          id: this.id,
          estado: this.estadoClone
        })

      }
    },
    
    
}
</script>