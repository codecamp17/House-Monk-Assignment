import {useState, useEffect} from 'react'
import axios from 'axios'

export default function RepoFetching(Url) {
    const[countOfFollowers, setCountOfFollowers] = useState(0)
    useEffect(()=>{
        axios({
            method:'GET',
            url:Url
        })
        .then(res=>{
            setCountOfFollowers(res.data.length)
            console.log(res.data)
        })
        .catch(e=>{
            if (e) return
        })
    },[Url])
    return {countOfFollowers}
}
