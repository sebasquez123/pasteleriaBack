const config = require('../../config');
const axios = require('axios');

async function respuesta (pregunta,contexto, count_espera)
    {
        const dialogo = ( `Context: ${contexto}. Answer the question: ${pregunta.trim()}?`);
    
        try {
            const response = await axios({
            method: 'POST',
            url: 'https://api-inference.huggingface.co/models/google/flan-t5-base',
            headers: {
                'Authorization': `Bearer ${config.openAiApiKey}`,
                "Content-Type": "application/json",
                },
            data: {
                inputs: dialogo,

                parameters: {
                    max_length: 100,  
                    // temperature: 0.3,
                    // do_sample: true,
                    num_beams: 5,
                    // top_k: 20,
                    // top_p: 0.8
                }
                }
        });

            // console.log(response.data);
            return response.data;
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




module.exports = respuesta;