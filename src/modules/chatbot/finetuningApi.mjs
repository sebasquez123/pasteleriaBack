// const config = require('../../config');
// const axios = require('axios');
import {Client} from "@gradio/client";
// const { Client } = require("@gradio/client");

async function respuesta (pregunta,contexto, count_espera)
    {
        const dialogo = pregunta.trim();
    
        try {
            const solicitudchat = await Client.connect("sebasqz/PasteleriaAliciaSpace");
            const result = await solicitudchat.predict("/chat", { message: dialogo });

            // console.log(response.data);
            return result.data;
        //    return 'completado';
        }
        
        catch (error) { 
            if (count_espera < 3) {
                count_espera++;
                console.log(`Error en la petición a HuggingFace, reintentando... ${count_espera}`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return respuesta(pregunta, contexto, count_espera);
            }
            else { count_espera = 0; throw new Error(`Error generating response from HuggingFace: ${error.message}`);}
            
        }
    }




export {respuesta} ;