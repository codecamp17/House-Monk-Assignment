import {useState, useEffect} from 'react'
import axios from 'axios'

export default function RepoFetching(repoUrl) {
    const[repos, setRepos] = useState([])
    useEffect(()=>{
        axios({
            method:'GET',
            url:repoUrl
        })
        .then(res=>{
            setRepos(res.data)
        })
        .catch(e=>{
            if (e) return
        })
    },[repoUrl])
    return {repos}
}
