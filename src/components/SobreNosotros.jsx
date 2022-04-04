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
        github: "github.com/Franco-13",
        puesto: "Front End",
        img: "https://avatars.githubusercontent.com/u/79342530?v=4"
    },
    {
        nombre: "Jorge Luis Nuñez Nuñez",
        linkedin: "https://www.linkedin.com/in/jorge-luis-nu%C3%B1ez-n/",
        github: "https://github.com/Oleguis",
        puesto: "Back End",
        img: "https://avatars.githubusercontent.com/u/91699181?v=4"
    }]


    return (
        <div className='d-flex flex-column align-items-center' style={{ minHeight: "70vh", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
            <h2 className='text-light'> Sobre Nosotros </h2>
            <div className='d-flex mb-5'>

                {
                    nosotros?.map((persona) => {
                        return (
                            <motion.div className="card mx-3 text-light border-0" whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.14)"}} style={{ width: "18rem", background: "linear-gradient(157deg, rgba(28,28,28,1) 0%, rgba(34,11,11,1) 80%, rgba(42,0,0,1) 100%)" }}>
                                <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
                                    <img src={persona.img} className="card-img-top rounded-circle" alt={persona.nombre} style={{ width: "70%" }} />
                                </div>
                                <div className="card-body ">
                                    <h4 className="card-title m-0">{persona.nombre}</h4>
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
                        )
                    })
                }
            </div>
        </div>

    )
}

export default SobreNosotros