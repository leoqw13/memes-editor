const MemeSettings = ({
  textNumber,
  textSize,
  onSetText,
  onSetTextSize,
  onSetTextColor,
  onSetFont,
  onDelText,
}) => {
  return (
    <div>
      <input
        type="text"
        className="inputText"
        onChange={onSetText}
        placeholder={` ${textNumber}`}
      />

      <p>Fuente del {textNumber}</p>
      <div className="fuente">
        <select name="font" defaultValue="arial" onChange={onSetFont}>
          <option value="Arial">Arial</option>
          <option value="Brush Script MT">Brush Script MT</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Courier New">Courier New</option>
          <option value="Garamond">Garamond</option>
          <option value="Georgia">Georgia</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <input type="color" onChange={onSetTextColor}></input>
      </div>
      <p>Tamaño del {textNumber}</p>
      <input
        type="range"
        min="0"
        max="72"
        value={textSize}
        onChange={onSetTextSize}
      ></input>
      <div className="deletePhrase">
        <button onClick={onDelText}>Borrar {textNumber}</button>
      </div>
    </div>
  );
};

export default MemeSettings;
