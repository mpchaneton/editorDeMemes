import React, { useState, useEffect } from 'react';
import html2canvas from "html2canvas";




const Imgmemes = () => {

    const [memes, setMemes] = useState([]);

    const [imgmeme, setImgmeme] = useState();

    const [textmeme, setTextmeme] = useState();



    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }

    const seleccionarImg = (e) => {
        setImgmeme(e.target.src);
    }



    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(data => data.json())
            .then(json => setMemes(json.data.memes));
    }, []);




    const descargar = (e) => {

        html2canvas(document.querySelector("#exportar"),
            { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then(function (canvas) {
                let img = canvas.toDataURL("memes/jpg");
                let link = document.createElement("a");
                link.download = "memepropio.jpg";
                link.href = img;
                link.click();
            });
    }



    return (

        <div className="editor">

            <h1>Editor de memes</h1>

            <div className="instrucciones">

                <h5>Seguí los siguientes pasos:</h5>
                <ol>
                    <li>Selecciona la imagen</li>
                    <li>Escribi el texto</li>
                    <li>Descargá tu meme</li>
                </ol>

            </div>


            <div className='paso1'>
                <p>Paso 1</p>

                <div className="imagenes">

                    {memes.map(meme => (
                        <div>
                            <img src={meme.url} onClick={seleccionarImg} alt={meme.name} width={"150px"} height={"150px"} />
                        </div>))
                    }
                </div>

            </div>



            <div className='paso2'>

                <p>Paso 2</p>

                <input onChange={textomeme} className="" type='text' placeholder='Pone tu frase' name="meme" />

            </div>


            <div className='paso3'>

                <p>Paso 3</p>

                <figure id="exportar">
                    <p className='textoMeme'>{textmeme}</p>
                    <img className="imgExportar" src={imgmeme} alt="meme selecionado" width={"150px"} height={"150px"} />
                </figure>

                <button onClick={descargar} type='button' className="btnDescargar">Descargar meme</button>

            </div>

        </div>

    )
}

export default Imgmemes;