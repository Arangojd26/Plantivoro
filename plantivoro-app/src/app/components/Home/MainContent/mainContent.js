import React from "react"
import product_card from "../../../../data/product_data";

const MainContent =()=>{
    console.log(product_card);
    const listItems = product_card.map((item)=>
        <div className="o-card" key={item.id}>
            <div className="card_img">
                <img src = {item.thumb} alt={item.product_name}/>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price">{item.price}<span>{item.currency}</span></p>
                <div className="btn">Añadir al Carrito</div>
            </div>
        </div>
    );
    return(
        <div className="main_content">
            <h3>Mandos</h3>
            {listItems}
        </div>
    )
    
}
export default MainContent;