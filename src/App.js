import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Hangman from "./Hangman";
import Headers from "./component/Headers";
import Footer from "./component/Footer";

function App() {
  



  return (
    <BrowserRouter>
      <Headers></Headers>
      <div className="main">
      <Switch >
        <Route path="/">
          <Hangman></Hangman>
        </Route>
      </Switch>
      </div>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
