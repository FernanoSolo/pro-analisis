import {storage, db} from '../firebase'


export default{
    namespaced: true,
    state:{

        nuevaEncuesta: {
            titulo: '',
            descripcion: '',
            preguntas: [
                {
                    pegunta: '',
                    respuestas: [
                        {
                            repuesta: ''
                    }]
                }
            ],
            tipo: '',
            estado: '',
            correo: ''
        }

    },
    mutations:{

        actualizarInfo(state, payload){
            state.nuevaEncuesta.titulo = payload.titulo;
            state.nuevaEncuesta.descripcion = payload.descripcion;
          }

    },
    actions:{

    },
    getters:{
        nuevaEncuesta: ({nuevaEncuesta}) => nuevaEncuesta
    }




}