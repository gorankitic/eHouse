import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // abort fetching if component is unmounted
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            try {
                const res = await fetch(url)
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                const json = await res.json()
                setIsPending(false)
                setData(json)
                setError(null)
            } catch(err) {
                if(err.name === "AbortError") {
                    console.log('The fetch was aborted.')
                } else {
                    setIsPending(false)
                    setError('Could not fetch the data.')
                }
            }
        }
        fetchData()

        // cleanup function runs every time when component that
        // uses useFetch is unmounted from DOM
        return () => {
            controller.abort()
        }
    }, [url])

    return { data, isPending, error }
}