import { storage, db } from '../firebase'

export default {
    namespaced: true,
    state: {
        grafica: [
            {
                pregunta: '',
                respuestas: [],
                totalRespuesta: []
            }
        ],
        resultados: null,
        preguntas: [],
        total: [{
            pregunta: '',
            respuestas: [] 

        }
    
    
    
    
    ],
        preguntasClone: [],
        carga: false

    },
    mutations: {
        asignarResultados(state, payload) {
            state.resultados = payload
        },
        resetResultados(state) {
            state.resultados = null
        },
        setPreguntas(state, payload) {
            if (!state.preguntas.includes(payload)) {
                state.preguntas.push(payload)


            }
        },
        // contador(state, payload) {

        //     var total = null
        //     let pregunta = payload.pregunta

        //     for (var i = 0; i < state.preguntas.length; i++) {

        //         if (payload.pregunta === state.preguntas[i]) {
        //             if (!pregunta + i.exist) {
        //                 var
        //             }
        //             let pregunta = payload.pregunta

        //         }
        //     }
        // },
        control(state, payload) {
           
            if(state.total[payload.data]===undefined){
                state.total[payload.data] ={
                    pregunta: '',
                    respuestas: []

                }
             }
             state.total[payload.data].pregunta = payload.pregunta 
           state.total[payload.data].respuestas.push(payload.res)



        },
        arrayACadena(state, payload){

            if(state.grafica[payload.data]===undefined){
                state.grafica[payload.data] ={
                    pregunta: '',
                    respuestas: [],
                    totalRespuesta: []
                }
             }
             state.grafica[payload.data].pregunta = payload.pregunta
        
            var cadena=[];
            var numero=[]
            for (var k in payload.arr)
        {
            cadena.push(k);
            numero.push(payload.arr[k])
        }
        state.grafica[payload.data].respuestas =cadena
        state.grafica[payload.data].totalRespuesta = numero
      
   // return cadena.join("; ");
        }

    },
    actions: {
        async consulta({ state, commit }, id) {
            state.carga = true
            const encu = {}

            var consulta = await db.collection('Respuestas').doc(id).get()

            consulta.data().fin.forEach(element => {

                delete element.id
                var encuesta = Object.values(element)

                encuesta.forEach(contestadas => {
                    commit('setPreguntas', contestadas.pregunta)

                    contestadas.respuestaSeleccionada.forEach(async respuestas => {
                            //console.log(contestadas.pregunta + '' + respuestas)

                            for (var i = 0; i < state.preguntas.length; i++) {

                                if (contestadas.pregunta === state.preguntas[i]) {

                                   await commit('control', { pregunta: contestadas.pregunta, res: respuestas, data: i })
                                  
                                }
                            }



                        })
                        // console.log(contestadas.respuestaSeleccionada)

                })

            });

            var contador
            //var fin
            for (var i = 0; i < state.preguntas.length; i++) {

                 
                contador=cuentaLetras(state.total[i].respuestas)
                //console.log(arrayACadena(contador))
               // fin = arrayACadena(contador)
                 commit('arrayACadena',{arr: contador, pregunta: state.preguntas[i], data: i  })   
            }
            state.carga = false
            
           
        }

    },
    getters: {
        resultados: ({ resultados }) => resultados,
        //total: ({ total }) => total,
        carga: ({ carga }) => carga,
        grafica: ({ grafica }) => grafica
       

    },
    
}
function cuentaLetras(txt1){
    var txt=txt1.toString()
    txt=txt.toLowerCase();
 
    var arr={};
    var n = txt.length;
    for(var i=0; i < n; i++){
        var char=txt.charAt(i);
        if (char==" "||char==","||char=='""' ) continue;
        if (arr[char]) arr[char]++
        else arr[char]=1;
    }
    return arr;
}

// function arrayACadena(arr){
//     var cadena=[];
//     var numero=[]
//     for (var k in arr)
//     {
//         cadena.push(k);
//         numero.push(arr[k])
//     }
//     console.log(cadena)
//     console.log(numero)
//     return cadena.join("; ");
// }