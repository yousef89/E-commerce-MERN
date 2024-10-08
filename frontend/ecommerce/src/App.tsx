import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element = {<HomePage></HomePage>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
