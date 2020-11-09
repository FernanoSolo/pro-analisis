import {storage, db} from '../firebase'


export default{
    namespaced: true,
    state:{

        nuevaEncuesta: {
            titulo: '',
            descripcion: '',
            preguntas:[{
              pregunta: "Primera pregunta",
              respuestas: [{
                respuesta: "Respuesta"
              }]
            }],
            tipo: 'Opción única',
            estado: 'Deshabilitada',
            correo: 'test@test.com'
        },
        lista: [],
        encuesta: null,
        cargaAnimacion: false

    },
    mutations:{

      cargaFirebase(state,payload){
        state.cargaAnimacion = payload
      },

        actualizarInfo(state, payload){
            state.nuevaEncuesta.titulo = payload.titulo;
            state.nuevaEncuesta.descripcion = payload.descripcion;
          },
          actualizarTipo(state, payload){
            console.log(payload)
            state.nuevaEncuesta.tipo = payload

          },
          agregarRespuesta(state, preguntaIndex){
            const respuestas = state.nuevaEncuesta.preguntas[preguntaIndex].respuestas;
  
            if(respuestas.length < 4){
              respuestas.push({
                respuesta: ""
              });
            }
          },
          eliminarPregunta(state, preguntaIndex){

            if(state.nuevaEncuesta.preguntas.length > 1){
              state.nuevaEncuesta.preguntas.splice(preguntaIndex,1)
            }
          },
          elimarRespesta(state,payload){

            const preguntaIndex = payload.preguntasIndex;
            const respuestaIndex = payload.respuestaIndex;
  
            const pregunta = state.nuevaEncuesta.preguntas[preguntaIndex] 
            
            
            if(pregunta.respuestas.length>1){
              pregunta.respuestas.splice(respuestaIndex,1);
              
            }
          },
          actualizarRespuesta(state, payload){

            const preguntasIndex = payload.preguntasIndex;
            const respuestaIndex = payload.respuestaIndex;            
            const respuestaText = payload.respuesta;

  
            const respuesta = state.nuevaEncuesta.preguntas[preguntasIndex].respuestas[respuestaIndex];
  
           
            respuesta.respuesta = respuestaText;
  
          },
          actualizarPregunta(state, payload){

            const pregunta = state.nuevaEncuesta.preguntas[payload.preguntasIndex];
  
            pregunta.pregunta = payload.pregunta;
           
          },
          resetPreguntas(state, payload){
            state.nuevaEncuesta = {
              
                titulo: payload.titulo,
                descripcion: payload.descripcion,
                preguntas:[{
                  pregunta: "Primera pregunta",
                  respuestas: [{
                    respuesta: "Respuesta"
                  }]
                }],
                estado: 'Deshabilitada'
                
            }
          },
          resetEncuesta(state){
            state.nuevaEncuesta = {
              
                titulo: '',
                descripcion: '',
                preguntas:[{
                  pregunta: "Primera pregunta",
                  respuestas: [{
                    respuesta: "Respuesta"
                  }]
                }],
                tipo: 'Opción única',
                estado: 'Deshabilitada',
                correo: 'test@test.com'
          
            }
            
          },
          agregarPregunta(state){

            state.nuevaEncuesta.preguntas.push({
              pregunta: 'Pregunta',
              respuestas: [{
                respuesta: "Respuesta"
              }]
    
            })
  
          },
          pushEncuesta(state,payload){
            state.lista.push(payload)
          },
          resetLista(state){
            state.lista=[];
          },
           setEncuesta(state,payload){
          state.nuevaEncuesta = payload
        }

    },
    actions:{
      async crear({state,commit}){
        try{
      
          var validacion = false;
          
          state.nuevaEncuesta.preguntas.map(pregunta=>{
            
            
            if(pregunta.pregunta==''){
              alert(`Existen preguntas vacias`);
              validacion = true
            }

            pregunta.respuestas.map(respuesta =>{
              if(respuesta.respuesta==''&&state.nuevaEncuesta.tipo!='Formato texto'){
                alert('Existen respuestas vacias')
                validacion = true
              }
            })
              

          });
          if(validacion===false){
          await db.collection('Encuestas').add({

            ...state.nuevaEncuesta
          });
          commit('resetEncuesta');
        }
        return validacion;
          
        }catch(error){
          alert('Ocurrio algun error al crear'+error);
        }
      },
      async actualizarEncuesta({state,commit}, payload){
        try{

          var validacion = false;
          
          state.nuevaEncuesta.preguntas.map(pregunta=>{
            
            
            if(pregunta.pregunta==''){
              alert(`Existen preguntas vacias`);
              validacion = true
            }

            pregunta.respuestas.map(respuesta =>{
              if(respuesta.respuesta==''&&state.nuevaEncuesta.tipo!='Formato texto'){
                alert('Existen respuestas vacias')
                validacion = true
              }
            })
              

          });
          if(validacion===false){

          await db.collection('Encuestas').doc(payload).set({

            ...state.nuevaEncuesta
          });
          commit('resetEncuesta');
        }
        return validacion;


        }catch(e){
            console.log(e)
        }

      },
      async listarEncestas({commit}){
        commit('resetLista')

        const encuestas = await db.collection('Encuestas').get();
        let listaencuestas 
        encuestas.forEach((cambio)=>{
          listaencuestas = {
            id: cambio.id,
            titulo: cambio.data().titulo,
            descripcion: cambio.data().descripcion,
            tipo: cambio.data().tipo,
            estado: cambio.data().estado

            // ...cambio.doc.data()
          }      
           commit('pushEncuesta',listaencuestas )
        })
      },
      async getEncuesta({commit},id){
        try{

        
        commit('cargaFirebase', true)

        const encuesta = await db.collection('Encuestas').doc(id).get();

        if(encuesta.exists){
          const encu= {
            id: encuesta.id,
            ...encuesta.data()
          }
          commit('setEncuesta',encu)
        }
      }catch(e){
        console.log(e)
      }finally{
        commit('cargaFirebase', false)
      }

      },
      async encuestaTerminada({state, commit},payload){
        
        var fin = [];

         const realizados = await db.collection('Respuestas').doc(payload.id).get();

          
          // var finalizado= {

          // }

         if(realizados.exists){
          
         console.log(realizados.data().fin)
          realizados.data().fin.forEach((res)=>{
            
            fin.push(res)
          })
          fin.push(payload)
          // console.log(fin)
          

          //realizados.data().fin.push(payload)
          //fin.push(realizados.data().fin)
          //fin.push(payload)
          // var fin={
          //   ...realizados.data().payload,
         
          // }
     

            await db.collection('Respuestas').doc(payload.id).set({
             fin
            })

         }else{
          fin.push(payload)

           await db.collection('Respuestas').doc(payload.id).set({
            fin
          })

         }

        

        

      },
      async actualizarEstado({commit},payload){

          console.log(payload.id)
          await db.collection('Encuestas').doc(payload.id).update({
            estado: payload.estado
          })

      }

    },
    getters:{
        nuevaEncuesta: ({nuevaEncuesta}) => nuevaEncuesta,
        lista: ({lista}) => lista,
        encuesta: ({encuesta}) => encuesta
    }




}