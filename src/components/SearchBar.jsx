import React, { useState } from 'react'

function SearchBar() {

    const [input, setInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setInput('')
    }


    return (
        <div style={{ width: "20%" }}>
            <div className="input-group mb-3">
                <input type="text" onChange={handleChange} value={input} className="form-control" placeholder="Especial Search" aria-label="Especial Search" aria-describedby="button-addon2" />
                <button className="btn btn-dark" onClick={handleClick} type="button" id="button-addon2">Search</button>
            </div>
        </div>
    )
}

export default SearchBar