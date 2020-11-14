<template>
    <div>
         <v-container>
            <v-row>
                <v-btn v-show="encuesta.preguntas.length < 10" class="mt-4" color="primary" @click="agregarPregunta" >Agregar Pregunta</v-btn>
            </v-row>
            <v-card-actions>
                    <v-spacer> </v-spacer>
                   <v-btn to="/Dashboard" >Cancelar </v-btn>
                    <v-btn  color="warning" @click="resetEncuesta">Reset</v-btn>
                     <v-btn @click="accion" dark color="purple"   >{{accionName}}</v-btn>
<!-- v-if="!encuesta.titulo==''&&!encuesta.descripcion==''" -->
            </v-card-actions>
        </v-container>

    </div>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    name: 'acciones-encuesta',
    props: ['accion','accionName'],
    computed: {
         ...mapGetters('encuesta',{encuesta:'nuevaEncuesta'}),
      //    ...mapGetters('encuesta',{carga:'carga'}),

    },
    methods: {
          ...mapMutations('encuesta',['agregarPregunta','resetEncuesta'])
    }

}
</script>