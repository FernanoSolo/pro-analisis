<template>
    <div>
         <v-container >
            <v-card cols="10" class="rounded-card" >
            <v-row justify="center">
                
                <v-col cols="8"  >
                    <v-text-field label="Titulo de la encuesta" :rules="[rules.required, rules.counter]" :value="encuesta.titulo" @input="actualizarTitulo" ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="8" >
                    <v-text-field label="Descripcion de encuesta" :rules="[rules.required, rules.counter]" maxlength="40" :value="encuesta.descripcion" @input="actualizarDescripcion" counter ></v-text-field>
                </v-col>
                
            </v-row>
            </v-card>
        </v-container>

    </div>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex'

export default {
    name: 'info-encuesta',
    data(){
        return{
             rules: {
          required: value => !!value || 'Requerido.',
          counter: value => value.length <= 40 || 'Max 40 caracteres',
            }
        }
    },
    computed: {
        ...mapGetters('encuesta',{encuesta:'nuevaEncuesta'})
    },
    methods:{
        ...mapMutations('encuesta',['actualizarInfo']),
        actualizarTitulo(value){
            this.actualizarInfo({
                titulo: value,
                descripcion: this.encuesta.descripcion
            })
        },
        actualizarDescripcion(value){
            this.actualizarInfo({
                descripcion: value,
                titulo: this.encuesta.titulo
            })
        }
    }
}
</script>