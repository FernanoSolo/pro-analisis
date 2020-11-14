<template>
    <div>
        <v-container v-if="cargaAnimacion===true" >
            <v-skeleton-loader
          v-bind="attrs"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>

        </v-container>
        <v-container v-if="cargaAnimacion===false">
            
            <div v-if="encuesta.estado=='Deshabilitada'" >
               <v-card>
 <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
      La Encuesta no esta disponible
    </v-alert>
    </v-card>
            </div>
            <div v-if="encuesta.estado=='Activa'">
             <v-row v-if="done">
            

                    <v-btn to="/Dashboard">Ir a Inicio</v-btn>
                   
                </v-row>

        <v-stepper v-model="step" vertical v-else >
            <v-stepper-header>
                            <template v-for="s in encuesta.preguntas.length">
                                <v-stepper-step :key="s" :step="s" :complete="step > s" />
                            </template>
                              <v-divider></v-divider>
            </v-stepper-header>

             <v-stepper-items>
                            <v-stepper-content  v-for="(pregunta, i) in encuesta.preguntas" :key="i" :step="i + 1">
                                 <h3>{{pregunta.pregunta}}</h3>
                               
                           <v-radio-group v-model="stepRespuesta" v-if="encuesta.tipo==='Opción única'" >
                           
                                    <v-radio
                                    v-for="(respuesta, j) in pregunta.respuestas"
                                    :key="j"
                                    :label="respuesta.respuesta"
                                    :value="j"
                                    ></v-radio>
                                </v-radio-group>
                                <!-- <v-radio-group v-model="stepRespuesta" v-if="encuesta.tipo==='Opción múltiple'" > -->
                                   
                                    <v-checkbox
                                    v-if="encuesta.tipo==='Opción múltiple'"
                                    v-model="res"
                                    v-for="(respuesta, j) in pregunta.respuestas"
                                    :key="j"
                                    :label="respuesta.respuesta"
                                    :value="respuesta.respuesta"
                                    :name="respuesta.respuesta"
                                    
                                    ></v-checkbox>
                                <!-- </v-radio-group> -->
                                <br>
                                <v-textarea
                                    v-if="encuesta.tipo==='Formato texto'"
                                    outlined
                                    name="input-7-4"
                                    label="Escribe tu Respuesta"
                                    v-model="textAreaValue"                               
                                ></v-textarea>
                                


                             <v-btn color="primary" @click.native="siguienteMultiple" v-if="encuesta.tipo==='Opción múltiple'" >siguiete</v-btn>
                             <v-btn color="primary" @click.native="siguiente" v-if="encuesta.tipo==='Opción única'" >siguiete</v-btn>
                             <v-btn color="primary" @click.native="siguienteFormato" v-if="encuesta.tipo==='Formato texto'" >siguiete</v-btn>
                              

                            </v-stepper-content>

                </v-stepper-items>
         


        </v-stepper>  
        </div>
        
        </v-container>
        
    </div>

</template>


<script>
import {mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'encuesta',
    data(){
        return{
            step: 1,
        stepRespuesta: null,
        done: false,
        respuestasEncuestas :[],
        res: [],
        textAreaValue: ''
        }
    },
    created(){
        this.getEncuesta(this.$route.params.id)

    },
    computed: {
       // ...mapGetters('encuesta',['encuesta'])
        ...mapGetters('encuesta',{encuesta:'nuevaEncuesta'} ),
        ...mapState('encuesta',['cargaAnimacion'])
    },
    methods: {
        ...mapActions('encuesta',['getEncuesta']),
        ...mapActions('encuesta',['encuestaTerminada']),

        siguienteFormato(){

             const pregunta = this.encuesta.preguntas[this.step -1];

             let Areapuesta =[]
             Areapuesta.push(this.textAreaValue)
             this.respuestasEncuestas.push({
                
               pregunta: pregunta.pregunta,
               respuestaSeleccionada:Areapuesta
                
                })
                
              
               if (this.step < this.encuesta.preguntas.length) {
                     this.step++;
                this.textAreaValue = ''    
                }else {
                    this.done = true;
                }
        },

        siguiente(){
            if(this.stepRespuesta == null) return;


                const pregunta = this.encuesta.preguntas[this.step -1];
                //const respuesta = pregunta.respuestas[this.stepRespuesta];
                //console.log(pregunta.respuestas[this.stepRespuesta].respuesta)
                let Arespuesta =[]
                Arespuesta.push(pregunta.respuestas[this.stepRespuesta].respuesta)
                    this.respuestasEncuestas.push({
                        pregunta: pregunta.pregunta,
                        respuestaSeleccionada: Arespuesta 
                    
                    })
                Arespuesta =[]

                 if (this.step < this.encuesta.preguntas.length) {
                     this.step++;
                    this.stepRespuesta = null;
                }else {
                    this.done = true;
                }
        },
        siguienteMultiple(){

            if(this.res<0 ) return null;

            const pregunta = this.encuesta.preguntas[this.step -1];
            this.respuestasEncuestas.push({
                pregunta: pregunta.pregunta,
                respuestaSeleccionada: this.res
            })
            
            if (this.step < this.encuesta.preguntas.length) {
                    //  this.step++;
                this.res =[];
                }else {
                    this.done = true;
                }

            this.step++;

        }
    },
watch: {
    
    done: function (){

        
        var data= {
            id: this.$route.params.id,
           ...this.respuestasEncuestas

        }
        
         this.encuestaTerminada(data)
        
     }
    }



}
</script>