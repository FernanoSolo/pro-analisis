<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-expansion-panels :focusable="true">
                        <v-expansion-panel v-for="(item,preguntasIndex) in encuesta.preguntas" :key="preguntasIndex" >
                            <v-expansion-panel-header>{{item.pregunta}}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-card class="grey lighten-3">
                                         <v-container>
                                                    <v-row>
                                                        <v-col cols="8">
                                                            <v-text-field label="Pregunta" :value="item.pregunta" @input="nombrePregunta($event, preguntasIndex)" ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <v-container>
                                                    <v-row v-for="(respuesta, respuestaIndex) in item.respuestas" :key="respuestaIndex" >
                                                        <v-row>
                                                        <v-col cols="8">
                                                            
                                                            <v-text-field class="ml-2" label="Respuestas" :value="respuesta.respuesta" @input="actualizarRespuestasText($event, preguntasIndex, respuestaIndex)" v-if="tipoPregunta!='Formato texto'"  ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2" >
                                                                 <v-btn small color="error" @click="elimarRespesta({preguntasIndex,respuestaIndex })" v-if="tipoPregunta!='Formato texto'" ><v-icon  >mdi-minus</v-icon>  </v-btn>
                                                        </v-col>
                                                       </v-row>              
                                                    </v-row>
                                                </v-container>
                                                <v-row class="pl-2 ml-4">
                                                     <v-btn  v-if="(tipoPregunta!='Formato texto') && (item.respuestas.length < 5)" color="orange" dark class="mt-6 mr-2"  @click="agregarRespuesta(preguntasIndex) "  >Agregar Respuesta</v-btn>
                                                    <v-btn  class="mt-6" color="error" dark @click="eliminarPregunta(preguntasIndex)" >Eliminar Pregunta </v-btn>    
                                                </v-row>


                                    </v-card>   
                                </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>    
    </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'tipoPregunta',
    props: ['tipoPregunta'],
    computed:{
         ...mapGetters('encuesta',{encuesta:'nuevaEncuesta'})
    },
    methods: {
        ...mapMutations('encuesta',['agregarRespuesta','eliminarPregunta','elimarRespesta','actualizarRespuesta','actualizarPregunta']),

        actualizarRespuestasText(value, preguntasIndex, respuestaIndex){
            this.actualizarRespuesta({
                respuesta: value,
                preguntasIndex,
                respuestaIndex
            })
        },
        nombrePregunta(value,preguntasIndex){
        

        this.actualizarPregunta({
            pregunta: value,
            preguntasIndex

        })


        }
        
    }
}
</script>