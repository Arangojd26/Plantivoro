import React from "react"

export default function Header(){
    return(
        <nav>
            <div className="logo">Mandivoro</div>
            <ul>
                <li>Inicio</li>
                <li>Nuestros Productos</li>
                <li>Sobre Nosotros</li>
                <li>Contáctanos</li>
            </ul>
            <div className="search">
                <i className="fa fa-search"></i>
                <i className="fas fa-shopping-basket"></i>
            </div>
        </nav>
    )
}