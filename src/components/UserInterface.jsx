import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPedidos, setPlatformUser } from '../actions'

function UserInterface() {
    const dispatch = useDispatch()
    const pedidos = useSelector(state => state.pedidos)
    const currentuser = useSelector(state => state.user)

    useEffect(async ()=>{
        console.log(currentuser)
        await dispatch(getPedidos(currentuser))
        console.log(pedidos)
    },[dispatch])



    return (



        <div>UserInterface</div>
    )
}

export default UserInterface