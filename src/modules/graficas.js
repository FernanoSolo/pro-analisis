import { storage, db } from '../firebase'

export default {
    namespaced: true,
    state: {
        resultados: null,
        preguntas: [],
        total: [{

        }],
        preguntasClone: [],

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


            console.log(payload)
            state.total[payload.data]
            console.log(posicion)



        }

    },
    actions: {
        async consulta({ state, commit }, id) {
            const encu = {}

            var consulta = await db.collection('Respuestas').doc('LIkVYs5iFwGZyPFOhQTW').get()

            consulta.data().fin.forEach(element => {

                delete element.id
                var encuesta = Object.values(element)

                encuesta.forEach(contestadas => {
                    commit('setPreguntas', contestadas.pregunta)

                    contestadas.respuestaSeleccionada.forEach(respuestas => {
                            //console.log(contestadas.pregunta + '' + respuestas)

                            for (var i = 0; i < state.preguntas.length; i++) {

                                if (contestadas.pregunta === state.preguntas[i]) {

                                    commit('control', { pregunta: contestadas.pregunta, res: respuestas, data: i })
                                }
                            }



                        })
                        // console.log(contestadas.respuestaSeleccionada)

                })

            });



            // console.log(a.data().fin)
            // var cantidad = a.data().fin
            // delete cantidad.id;
            // //   commit('asignarResultados', cantidad)
            // var l = Object.values(cantidad)
            // console.log(l)
            // l.forEach(element => {
            //     return element;
            // });
        }

    },
    getters: {
        resultados: ({ resultados }) => resultados,

    }
}