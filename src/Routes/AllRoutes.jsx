import { Route, Routes } from "react-router-dom"
import { Answer } from "../Components/Answer/Answer";
import { Header } from "../Components/Header/Header"
import { Home } from "../Home/Home";

export const AllRoutes = () => {

    return (
        <>
        <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/answer" element={<Answer />} />
         </Routes>
        </>
    )
}