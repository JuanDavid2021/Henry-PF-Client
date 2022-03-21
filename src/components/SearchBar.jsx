import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {searchProduct} from "../actions"


function SearchBar() {

    
    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(searchProduct(input))
    }


    return (
        <div style={{ width: "100%" }}>
            <div className="input-group mb-3">
                <input type="text" onChange={handleChange} value={input} className="form-control" placeholder="Busqueda especifica" aria-label="Especial Search" aria-describedby="button-addon2" />
                <button className="btn btn-dark" onClick={handleClick} type="button" id="button-addon2">Buscar</button>
            </div>
        </div>
    )
}

export default SearchBar