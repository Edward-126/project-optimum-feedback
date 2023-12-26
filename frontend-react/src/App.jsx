import Feedback from "./containers/feedback/Feedback";
import "./App.css";

import { inject } from "@vercel/analytics";

function App() {
  return (
    <>
      <Feedback />
    </>
  );
}

export default App;

inject();
