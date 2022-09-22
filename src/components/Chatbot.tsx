import React from 'react'
// import '../styles/chatbot.css';
import '../styles/estilosg.css';
import { useRef, useState, useEffect, useMemo, useCallback, } from 'react'
// import {bot} from './bot'
import { btn_blue } from './bot';
import { DirectLine } from 'botframework-directlinejs';
// import { createStore } from 'botframework-webchat';
import { Dispatch } from 'redux';
// import { useDispatch } from './WebChatReduxContext';

import classNames from 'classnames';
// import React, { useCallback, useMemo, useState } from 'react';
import { createStore } from 'botframework-webchat';


let store = undefined;
declare global {
    interface Window {
        WebChat: any;
    }
}
window.WebChat = window.WebChat || {};




export const Chatbot = () => {

    const [newMessage, setNewMessage] = useState(false);

    const handleMaximizeButtonClick = useCallback(async () => {
        // setLoaded(true);
        // setMinimized(false);
        setNewMessage(false);
      }, [ setNewMessage]);


      const handleMinimizeButtonClick = useCallback(() => {
        // setMinimized(true);
        setNewMessage(false);
      }, [ setNewMessage]);

    // const dispatch = useDispatch();

    const textInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        textInput.current?.focus();
    }, []);

    //////////pruebas00
    // (async function () {
    async function llamadadasc() {

        // In this demo, we are using Direct Line token from MockBot.
        // Your client code must provide either a secret or a token to talk to your bot.
        // Tokens are more secure. To learn about the differences between secrets and tokens
        // and to understand the risks associated with using secrets, visit https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0

        //base
        // const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
        // const { token } = await res.json();
        //fin base

        //inicio nuestro    /// que es igual a  call_api_directline
        // const rawResponse = await fetch("https://mkt-tec-dev-webapi.azurewebsites.net/DirectLine", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userId: "dd",
        //         name: "elnombrequesea"
        //     })
        // });
        // const content = await rawResponse.json();
        // console.log("elcontentw", content)

        // let objjs = JSON.parse(content)

        // let token = objjs.token
        // let conversationId = objjs.conversationId

        //fin nuestro

        // Creando DirectLine
        //    this.token_resp = await this.call_api_directline(this.correo).toPromise();
        let secret;
        let directLine = window.WebChat.createDirectLine({
            // token: token,
            // conversationStartProperties:{
            //     locale: 'es-mx'
            // }
            secret: "ev9a-rAQj3o.ijy-Ta2nSPjVUPyhDS-kMN8WW314TzDkR7JnwZwICu8",
            conversationStartProperties: {
              locale: 'es-mx',
              user: {}
            },  
        });
        // pruebas
        // const adaptiveCardsHostConfig = token.adaptiveCardsHostConfig;
        // We are creating our own version of Redux store, which includes middleware and an optional initial state.
        // store = window.WebChat.createStore({}, (dispatch: Dispatch) => (next: (arg0: any) => any) => (action: { type: string; payload: { activity: any; }; }) => {
        //   if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        //       alert("ocrrio algo")
        //     // After connected, we will send a message by dispatching a Redux action.
        //     dispatch({ type: 'WEB_CHAT/SEND_MESSAGE', payload: { text: 'hola22' } });
        //   } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        //     alert("ocrrio algo2")
        //     // When receiving an activity of type "event" with name of "sample:backchannel", prompt it out.
        //     const { activity } = action.payload;

        //     if (activity.type === 'event' && activity.name === 'sample:backchannel') {
        //       alert(JSON.stringify(activity, null, 2));
        //     }
        //   }

        //   return next(action);
        // });
        
        console.log("antes del STORE");
        
        let store


        console.log("STORE VACIO COMENZANDO", store);
        const MinimizableWebChat = () => {

          useEffect( ()=>{
            console.log('App render');  
          })

             store = useMemo( 
                () =>
                createStore({}, (dispatch: Dispatch) => (next: (arg0: any) => any) => (action: { type: string; payload: { name: string; value: any;  activity: any; }  }) => {
                  alert("DIRECT_LINE/CONNECT_FULFILLED");
                  console.log(action);
                  console.log("Iniciando la conversación del bot");
                  if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                    
                    dispatch({
                      type: 'WEB_CHAT/SEND_EVENT',
                      payload: {
                        name: 'startConversation'
                      }
                    //   payload: {
                    //     name: 'webchat/join',
                    //     value: {
                    //       language: window.navigator.language
                    //     }
                    //   }
                    });
                  } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                    if (action?.payload?.activity?.from.role === 'bot') {
                      setNewMessage(true);
                      console.log("ENTRO EN setNewMessage(true);");
                    }
                  }

                  

                  if (action.type === 'WEB_CHAT/SEND_MESSAGE_BACK') {
                    alert("WEB_CHAT/SEND_MESSAGE_BACK")
              
                  }

                  console.log("Cuando se pulsa un submit");
                  if (action.type === 'WEB_CHAT/SEND_POST_BACK') {
                      alert("WEB_CHAT/SEND_POST_BACK")
                      if (action.payload.value.hasOwnProperty("key")) {
                        var value = action.payload.value;
              
                        // Enviando evento
                        dispatch({
                          type: 'WEB_CHAT/SEND_EVENT',
                          payload: {
                            name: 'evaluarMenu',
                            value: value
                          }
                        });
              
                        // Evaluando si contiene url
                        if (action.payload.value.hasOwnProperty("redirect_url")) {
                          var redirect_url = action.payload.value.redirect_url;
                          window.open(redirect_url, "_blank");
                        }
                      }
                  }
                   

                  // debugger
                  // Cuando se pulsa un submit
                  if (action.type === 'WEB_CHAT/SEND_POST_BACK') {
                      alert("postback")
                    if (action.payload.value.hasOwnProperty("key")) {
                      var value = action.payload.value;

                      // Enviando evento
                      dispatch({
                        type: 'WEB_CHAT/SEND_EVENT',
                        payload: {
                          name: 'evaluarMenu',
                          value: value
                        }
                      });

                      // Evaluando si contiene url
                      if (action.payload.value.hasOwnProperty("redirect_url")) {
                        var redirect_url = action.payload.value.redirect_url;
                        window.open(redirect_url, "_blank");
                      }
                    }
                  }
                      
                              return next(action);
                            }),
                        []
                );
        }
        // <MinimizableWebChat/>

            // console.log("createStore()", createStore())
            console.log("el store TERMINANDO", store)
            console.log("elMinimizableWebChat", MinimizableWebChat)

        // Programar el envío del evento para iniciar la conversación
       
        // store = window.WebChat.createStore({}, (dispatch: Dispatch) => (next: (arg0: any) => any) => (action: { type: string; payload: { name: string; value: boolean; } | undefined; }) => {


        //     // Iniciando la conversación del bot
        //     if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        //         alert("DIRECT_LINE/CONNECT_FULFILLED")
        //         dispatch({
        //             type: 'WEB_CHAT/SEND_EVENT',
        //             payload: {
        //                 name: 'startConversation'
        //             }
        //         });
              
        //     }

        //     // Cuando se pulsa un submit
        //     if (action.type === 'WEB_CHAT/SEND_POST_BACK') {
        //         alert("WEB_CHAT/SEND_POST_BACK")
        //         if (action?.payload?.value.hasOwnProperty("key")) {
        //             var value = action.payload.value;

        //             // Enviando evento
        //             dispatch({
        //                 type: 'WEB_CHAT/SEND_EVENT',
        //                 payload: {
        //                     name: 'evaluarMenu',
        //                     value: value
        //                 }
        //             });

        //             // Evaluando si contiene url
        //             if (action.payload.value.hasOwnProperty("redirect_url")) {
        //                 alert("el submit")
        //                 // var redirect_url = action.payload.value.redirect_url;
        //                 // window.open(redirect_url, "_blank");
        //             }
        //         }
        //     }
        //     return next(action);

        // });

        // console.log("eladaptiveCardsHostConfig", adaptiveCardsHostConfig)
        console.log("elstore", store)
        // console.log("eltoken67", token)

        // Enviando información del usuario y renderizando el bot
        window.WebChat.renderWebChat(
            {
                // 1
                //   userID: id,
                //   username: "correomio@correo.com",
                // userID: token.conversationId,
                // username: data["Email"],

                // directLine: new DirectLine({
                //     token: token,
                //     conversationStartProperties: {
                //         locale: 'es-mx'
                //     },
                // }),

                // store,
                // adaptiveCardsHostConfig: adaptiveCardsHostConfig,
                //   styleOptions: styleOptions,
                directLine : directLine,
                locale: 'es-mx',
                //   webSpeechPonyfillFactory: this.webSpeechPonyfillFactory,
                // fin de 1

                // 2
                //     userID: id,
                //   username: "correomio@correo.com",
                // userID: token.user_id,
                // username: data["Email"],
                // // directLine: window.WebChat.createDirectLine({ token }),
                // directLine: directLine,
                // // store,
                // styleOptions: {
                //     backgroundColor: 'rgba(255, 255, 255, .8)'
                // }
                // fin de 2

            }, document.getElementById('webchat')
        );

        // fin de pruebas





        // window.WebChat.renderWebChat(
        //   {
        //     directLine: window.WebChat.createDirectLine({ token })
        //   },
        //   document.getElementById('webchat')
        // );




        // let elname = document.querySelector('#webchat > *')

        // const elw: HTMLElement = document.getElementById('#webchat > *') as HTMLElement;

        // document.querySelector<HTMLInputElement>(`input[name=${elname}]`)?.focus()

        // (currentActive.previousElementSibling as HTMLElement).focus();
        // elw.focus();

        // document.querySelector('#webchat > *').focus();
    }
    /////////fin pruebas 00


    llamadadasc()

    let data = {
        "AccountName": "Local Host",
        "DisplayName": "LocalHost:44307",
        "Email": "localhost@test.com",
        "ExtendedManagers": "No",
        "Title": "Titulo",
        "UserProfile_GUID": "",
        "UserName": undefined,
        "FirstName": undefined,
        "LastName": undefined,
        "ITESMPersonPIDM": undefined,
        "ITESMStAcadPlanID": undefined,
        "ITESMStAcadPlanDesc": undefined,
        "ITESMStACampusDesc": undefined,
        "ITESMStAcadPlanNivel": undefined,
        "ITESMStAcadPlanNivelDesc": undefined,
        "ITESMStAEstatus": undefined,
        "urlOrigen": window.location.href,
        "urlOrigenPadre": window.parent.window.location.href
    };

    const [toggleasaludo, settoggleasaludo] = useState(false)
    const [togglefloating, settogglefloating] = useState(false)
    const [toggleenca, settoggleenca] = useState(false)

    const open = () => {
        settoggleasaludo(true)
        settogglefloating(true)
        settoggleenca(true)
        btn_blue()
    }

    // const saludoElement = useRef<HTMLDivElement | null >(null)

    // let saludoElement: HTMLInputElement | null;

    // const open =()=>{
    // if(typeof saludoElement == "HTMLDivElement"){
    // saludoElement.current.style.opacity = 0;

    //         if(saludoElement==null){
    //             return;
    //         }

    //         if(saludoElement.current){
    //             saludoElement.current?.textContent = "hola"
    //         }



    //         // console.log("elconsole", saludoElement.current?.textContent)
    //         // console.log("elconsole", saludoElement.current?.style.opacity)


    //         // saludoElement.current.style.opacity = 0;
    //         // saludoElement.current.style.visibility = "hidden";
    //     // }

    // }

    console.log("entra a chatbot")


    return (
        <>
            {/* <body> */}

            <div className={`saludo_bot ${toggleasaludo && "tooglesaludohidden"}`} onClick={open} >
                <div className="bot_mensaje">Hola soy TECbot, ¿en qué te puedo ayudar?</div>
                <img className="bot" src='https://stg0chbot0tec0prod.blob.core.windows.net/bot-imagen/BotImage.png'/>
            </div>

            {/* <div className= { ` ${togglefloating} ?? "floating-chatstate" : "floating-chat" `} > */}
            <div className={togglefloating ? "floating-chatstate" : "floating-chat"} >

                {/* <div className="encabezado"> */}
                <div className={toggleenca ? "encabezado" : "encabezadotog"}>
                    <div className='left'>
                        <img className="btn_imagenbot" src='https://stg0chbot0tec0prod.blob.core.windows.net/bot-imagen/BotImage.png'/><span>&nbsp;&nbsp;&nbsp;<b>TECbot</b></span>
                    </div>
                    <div className='right'>
                        <button className="btn_translate" >
                            <p style={{ display: "inlineBlock", verticalAlign: "middle" }} className="material-icons-translate"></p>
                            <p style={{ display: "inlineBlock", verticalAlign: "middle" }} className="material-icons-translate"></p>
                        </button>
                        <button className="btn_encabezado">
                            <i style={{ display: "inlineBlock", verticalAlign: "middle" }} className="material-icons">tag_faces</i>

                        </button>
                        {/* <button className="btn_encabezado" id="btn_chbot_cerrar">
                            <i style={{ display: "inlineBlock", verticalAlign: "middle" }} className="material-icons">close</i>
                        </button> */}
                    </div>
                    <div className="webchat" id="webchat" ref={textInput} role="main">hola mundo</div>
                    {/* <div className="webchat" role="main" /> */}
                </div>
            </div>
            {/* </body> */}
        </>
    )
}

export default Chatbot;