import { motion } from 'framer-motion'
import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'




function SobreNosotros() {


    const nosotros = [{
        nombre: "Valentino Spada",
        linkedin: "https://www.linkedin.com/in/valentino-spada/",
        github: "https://github.com/valentinoSPADA",
        puesto: "Front End",
        img: "https://avatars.githubusercontent.com/u/91897537?v=4"
    },
    {
        nombre: "Franco Gonzalez",
        linkedin: "https://www.linkedin.com/in/fran-gonzalez13/",
        github: "https://github.com/Franco-13",
        puesto: "Front End",
        img: "https://avatars.githubusercontent.com/u/79342530?v=4"
    },
    {
        nombre: "Jorge Luis Nuñez Nuñez",
        linkedin: "https://www.linkedin.com/in/jorge-luis-nu%C3%B1ez-n/",
        github: "https://github.com/Oleguis",
        puesto: "Back End",
        img: "https://avatars.githubusercontent.com/u/91699181?v=4"
    },
    {
        nombre: "Juan David Rodriguez",
        linkedin: "https://www.linkedin.com/in/juandavidrodriguezlopez/",
        github: "https://github.com/JuanDavid2021",
        puesto: "Full Stack",
        img: "https://avatars.githubusercontent.com/u/87767241?v=4"
    },
    {
        nombre: "Federico Di Donato",
        linkedin: "https://www.linkedin.com/in/federicodidonato/",
        github: "https://github.com/FDDeC",
        puesto: "Full Stack",
        img: "https://avatars.githubusercontent.com/u/83348277?v=4",
    },
    {
        nombre: "Fabricio Olivera",
        linkedin: "https://www.linkedin.com/in/fabricio-olivera-developer/",
        github: "https://github.com/FabricioOlivera",
        puesto: "Back End",
        img: "https://avatars.githubusercontent.com/u/78769625?v=4",
    },
    {
        nombre: "David Niño",
        linkedin: "https://www.linkedin.com/in/david-alejandro-nino/",
        github: "https://github.com/Alejo-Nino95",
        puesto: "Full Stack",
        img: "https://avatars.githubusercontent.com/u/90222547?v=4",
    }]


    return (
        <div className='d-flex flex-column align-items-center' style={{ backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
            <div className='card bg-dark bg-opacity-75 px-4 py-4 rounded mx-3 my-5' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 className='text-light'> Sobre Nosotros </h2>
                <p className='text-light fs-5'>Beef shop es un e-commerce que facilita la compra de productos de carniceria.</p>
                <p className='text-light fs-5'>Nuestro objetivo es lograr que cualquier persona pueda realizar una compra de manera rapida y sencilla.</p>
                <p className='text-light fs-5'>Esto es parte del proyecto final del Bootcamp Soy Henry, por lo cual todo lo que este relacionado con el stock, los pagos, etc. es ficticio.</p>
            </div>
            <div className='card bg-light bg-opacity-50 px-4 py-4 rounded' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 className='text-dark fw-bold'> EQUIPO DE TRABAJO </h1>
            </div>
            <div className="container">
                <div className="row py-5">
                    {
                        nosotros?.map((persona) => {
                            return (
                                <div className="col-auto col-sm-6 col-lg-4 col-xl-3">
                                    <motion.div className="card mx-xl-3 mx-sm-1 my-3 text-light border-0" whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.14)" }} style={{ background: "linear-gradient(157deg, rgba(28,28,28,1) 0%, rgba(34,11,11,1) 80%, rgba(42,0,0,1) 100%)" }}>
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                            <img src={persona.img} className="card-img-top rounded-circle" alt={persona.nombre} style={{ width: "70%" }} />
                                        </div>
                                        <div className="card-body ">
                                            <h5 className="card-title m-0">{persona.nombre}</h5>
                                        </div>
                                        <ul className="list-group list-group-flush border-0" style={{ background: "transparent" }}>
                                            <li className="list-group-item border-0 text-light" style={{ background: "transparent" }}><h5 className="m-0 fw-normal">Full Stack Developer</h5></li>
                                            <li className="list-group-item border-0 fw-normal text-light" style={{ background: "transparent" }}>Puesto de proyecto: <b className='fw-bold'>{persona.puesto}</b></li>
                                            <li className="list-group-item fw-light text-light" style={{ background: "transparent" }}>Lo podes encontrar en</li>
                                        </ul>
                                        <div className="card-body d-flex justify-content-around">
                                            <a href={persona.linkedin} target="_blank"><BsLinkedin size={"30px"} color={"white"} /></a>
                                            <a href={persona.github} target="_blank"><BsGithub size={"30px"} color={"white"} /></a>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default SobreNosotros