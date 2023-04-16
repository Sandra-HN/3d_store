import { useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { ScreenCapture } from "react-screen-capture";
import { CustomButton } from "./components";

function App() {
  const [screenCapture, setScreenCapture] = useState("");

  function handleScreenCapture(screenCapture) {
    setScreenCapture(screenCapture);
  }

  function handleSave() {
    const downloadLink = document.createElement("a");
    const fileName = "react-screen-capture.png";

    downloadLink.href = screenCapture;
    downloadLink.download = fileName;
    downloadLink.click();
    setScreenCapture("");
  }

  return (
    <ScreenCapture onEndCapture={(url) => handleScreenCapture(url)}>
      {({ onStartCapture }) => (
        <main className="app transition-all ease-in">
          <Home screenCapture={screenCapture} handleSave={handleSave} onStartCapture={onStartCapture} />
          <Canvas />
          <Customizer screenCapture={screenCapture} handleSave={handleSave} onStartCapture={onStartCapture} />
        </main>
      )}
    </ScreenCapture>
  );
}

export default App;
