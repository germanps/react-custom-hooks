import { useState, useEffect, useRef } from 'react'

export const useFetch = (url) => {

    //cancel subscriptions
    //keep the reference to component when is mounted 
    const isMounted = useRef(true)

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        //cancel subscription (when component dismount)
        return () => {
            //cleanup
            isMounted.current = false
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                //llamar al componente(setState) de forma segura únicamente cuando esté montado
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                } else {
                    console.log('Se evitó cargar el componente');
                }

            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'Error al cargar la información'
                })
            })

        //se ejecutará cuando el url cambie
    }, [url])


    return state;

}
