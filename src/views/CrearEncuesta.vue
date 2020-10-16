<template>
    <div>
        <v-container>
        <div class="headline"  style=" color: #004cac; font-weight: 700; ">
                      <h2>  Nueva Encuesta </h2>
                    </div>
               
            
            <v-subheader>Informacion de Encuesta</v-subheader>
             <InfoEncuesta></InfoEncuesta>
        </v-container>
    </div>
</template>

<script>
import InfoEncuesta from '@/components/InfoEncuesta'
export default {
    name: 'crear-encuesta',
    components: {
        InfoEncuesta
    }
}
</script>