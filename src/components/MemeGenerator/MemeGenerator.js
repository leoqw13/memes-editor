import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "./memeGenerator.css";
import interact from "interactjs";
import MemeSettings from "../MemeSettings/MemeSettings.js";
import { getMemes } from "../../services/meme";

const MemeGenerator = () => {
  const [memeList, setList] = useState([]);
  const [memeImage, setImage] = useState("");
  const [memeText, setText] = useState("");
  const [memeText2, setText2] = useState("");
  const [memeText3, setText3] = useState("");
  const [textSize, setTextSize] = useState(22);
  const [textSize2, setTextSize2] = useState(22);
  const [textSize3, setTextSize3] = useState(22);
  const [font, setFont] = useState("arial");
  const [font2, setFont2] = useState("arial");
  const [font3, setFont3] = useState("arial");
  const [textColor, setTextColor] = useState("#FFF");
  const [textColor2, setTextColor2] = useState("#FFF");
  const [textColor3, setTextColor3] = useState("#FFF");
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  const delPhrase = () => {
    setFont("arial");
    setTextColor("#ffff00");
    setText("");
  };
  const delPhrase2 = () => {
    setFont2("arial");
    setTextColor2("#ffff00");
    setText2("");
    setShowText2(false);
  };
  const delPhrase3 = () => {
    setFont3("arial");
    setTextColor3("#ffff00");
    setText3("");
    setShowText3(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMemes();
        setImage(response[0].url);
        setList(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const Download = () => {
    html2canvas(document.querySelector("#export"), {
      allowTaint: true,
      useCORS: true,
      width: 400,
    }).then(function (canvas) {
      let img = canvas.toDataURL("memes/jpg");
      let link = document.createElement("a");
      link.download = "meme.jpg";
      link.href = img;
      link.click();
    });
  };

  const position = { x: 0, y: 0 };
  interact(".draggable").draggable({
    listeners: {
      start(event) {},
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });

  return (
    <>
      <div className="header">
        <h1>Generador de memes</h1>
        <h2 className="titleText">Elige una imagen</h2>
        <select onChange={(e) => setImage(e.target.value)}>
          {memeList.map((meme) => (
            <option key={meme.id} value={meme.url}>
              {meme.name}
            </option>
          ))}
        </select>
      </div>
      <div className="memeGeneratorContainer">
        <div className="figure">
          <figure id="export">
            <figcaption
              className="memeText draggable"
              style={{
                color: `${textColor}`,
                fontSize: `${textSize}px`,
                fontFamily: `${font}, serif`,
              }}
            >
              {memeText}
            </figcaption>
            <figcaption
              className="memeText draggable"
              style={{
                color: `${textColor2}`,
                fontSize: `${textSize2}px`,

                fontFamily: `${font2}, serif`,
              }}
            >
              {memeText2}
            </figcaption>
            <figcaption
              className="memeText draggable"
              style={{
                color: `${textColor3}`,
                fontSize: `${textSize3}px`,

                fontFamily: `${font3}, serif`,
              }}
            >
              {memeText3}
            </figcaption>
            <img src={memeImage} alt="MemeImage" className="memeImage" />
          </figure>
        </div>
        <div className="memeSettings">
          <h2 className="titleText">Escribe el texto del meme</h2>
          <p>Arrastralos para ubicarlos en la imagen</p>
          <MemeSettings
            textNumber={"Texto 1"}
            onMemeTextSize={textSize}
            onSetText={(e) => setText(e.target.value)}
            onSetTextSize={(e) => setTextSize(e.target.value)}
            onSetTextColor={(e) => setTextColor(e.target.value)}
            onSetFont={(e) => setFont(e.target.value)}
            onDelText={delPhrase}
          />
          {showText2 ? (
            <MemeSettings
              textNumber={"Texto 2"}
              onMemeTextSize={textSize2}
              onSetText={(e) => setText2(e.target.value)}
              onSetTextSize={(e) => setTextSize2(e.target.value)}
              onSetTextColor={(e) => setTextColor2(e.target.value)}
              onSetFont={(e) => setFont2(e.target.value)}
              onDelText={delPhrase2}
            />
          ) : (
            <button onClick={() => setShowText2(true)}>Agregar texto 2</button>
          )}

          {showText3 ? (
            <MemeSettings
              textNumber={"Texto 3"}
              onMemeTextSize={textSize3}
              onSetText={(e) => setText3(e.target.value)}
              onSetTextSize={(e) => setTextSize3(e.target.value)}
              onSetTextColor={(e) => setTextColor3(e.target.value)}
              onSetFont={(e) => setFont3(e.target.value)}
              onDelText={delPhrase3}
            />
          ) : (
            <button onClick={() => setShowText3(true)}>Agregar texto 3</button>
          )}
        </div>
      </div>
      <div className="header">
        <button onClick={Download} type="button" className="btnDownload">
          DESCARGAR MEME
        </button>
      </div>
    </>
  );
};

export default MemeGenerator;
