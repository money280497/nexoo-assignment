import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

function App() {
  const [data, setData] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [colour, setColour] = useState("");
  const [font, setFont] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://quotes.stormconsultancy.co.uk/random.json",
    };

    const requestData = axios.request(options);
    const requestFamilyName = axios.get(
      "https://raw.githubusercontent.com/zachleat/font-family-reunion/master/test/src/font-families.json"
    );
    axios
      .all([requestData, requestFamilyName])
      .then(
        axios.spread((...responses) => {
          const responseData = responses[0];
          const responseFamilyName = responses[1];
          setData(responseData.data);
          setFont(
            responseFamilyName.data.families[Math.floor(Math.random() * 1657)]
          );
          setColour(getRandomColor());
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, [isSending]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <div
      className="App"
      style={{
        fontFamily: font,
        color: colour,
        border: colour,
        padding: "20px",
        borderTop: "5px solid" + colour,
        borderRight: "5px solid" + colour,
      }}
    >
      <h2>" {data.quote}</h2>
      <h4>- {data.author}</h4>

      <div className="btn__container">
        <TwitterShareButton title={data.quote} url={data.author}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <button
          className="btn"
          onClick={() => setIsSending(!isSending)}
          style={{ background: colour }}
        >
          New quote
        </button>
      </div>
    </div>
  );
}

export default App;
