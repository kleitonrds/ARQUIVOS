import {useState, useEffect } from "react"




//4 - custom hook
export const useFetch = (url) => {
    const[data, setData] = useState(null);
    //criar o request que vai invocando a requisição da API
    //5 - refatorando o POST

    const [config, setConfig] = useState(null); // vai configurar o metodo que vai ser utilizado ( method, cabecalho...)
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false); 

    // 6 - Loading
    const [loading, setLoading] = useState(false);

    // 7 - Tratando erros
    const [error, setError] = useState(null);

   // 8 - desafio
   const [itemId, setItemId] = useState(null)


    const httpConfig = (data, method) =>  {
       
        if (method === "POST") { 
            setConfig ({
                method,
                headers: {
                    "Content-type" : "application/json",
                },
                body : JSON.stringify(data),
            });

            setMethod(method);
        }
        else if (method === "DELETE"){
            setConfig ({
                method,
                headers: {
                    "Content-type" : "application/json",
                }
                                       
               
            });
            

            setMethod(method);
            setItemId(data);
           
           

        }
    }



    useEffect (() => {      

        const fetchData = async () => {

            //6 - Loading
            setLoading(true)

            try {
                const res = await fetch(url);

                const json_ = await res.json();

            setData(json_);

            } catch (error){
                console.log(error.message);

                setError("Houve algum erro ao carregar os dados!")

            }

            

            setLoading(false);
        }

        fetchData();       
       
    }, [url, callFetch]);





    
    // 5 - refatorando post
    useEffect (() => {

       

        const httpRequest = async () => {
            let json;

            if(method === "POST"){           

                let fetchOptions = [url, config];
    
                const res = await fetch(...fetchOptions);
                
                 json = await res.json();
    
                    
        
            }
            else if (method === "DELETE"){        

               const deleteUrl = `${url}/${itemId}`;

              
                const res = await fetch(deleteUrl, config);
                
                 json = await res.json();
                               
    
            }
            setCallFetch(json); 
        };

        httpRequest();
       

    }, [config, method, url, itemId]);

    return { data, httpConfig, loading, error };

}