import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import NavBar from "./components/NavBar"
import RegisterPage from "./Pages/RegisterPage"

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element = {<HomePage></HomePage>}/>
          <Route path="/register" element= {<RegisterPage></RegisterPage>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
