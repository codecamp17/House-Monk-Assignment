import {useState, useEffect} from 'react'
import axios from 'axios'

export default function UserFetching(userId) {
    const[gituser,setGitUser] = useState({})
    const[installing,setInstalling] = useState(true)
    useEffect(()=>{
        axios({
            method:'GET',
            url:`https://api.github.com/user/${userId}`
        })
        .then(res=>{
            setGitUser(res.data)
            setInstalling(false)
        })
        .catch(e=>{
            console.log(e)
        })
    },[userId])
    return {gituser, installing}
}
