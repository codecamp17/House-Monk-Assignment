import {useEffect,useState} from 'react'
import Axios from 'axios'


export default function DataFetching(statement, count) {
    const [installing, setInstalling]=useState(true)
    const [githubs, setGithubs]=useState([])
    const [hasMore, setHasMore]=useState(false)

    useEffect(()=>{
        setGithubs([])
    },[statement])

    useEffect(()=>{
        let cancel
        Axios({
            method:'get',
            url:'https://api.github.com/search/users',
            params:{q:statement, page:count, per_page:20},
            cancelToken:new Axios.CancelToken(c=> cancel=c)
        })
        .then(res=>{
            setGithubs(prevGithubs=>{
                return [...prevGithubs, ...res.data.items]
            })
            setHasMore(res.data.items.length>0)
            setInstalling(false)
        })
        .catch(e=>{
            if (Axios.isCancel(e)) return
            console.log(e)
        })
        return()=>cancel()
    },[statement, count])
    return { installing, githubs, hasMore}
}
