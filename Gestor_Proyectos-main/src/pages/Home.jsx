import React from "react";
import Header from "../components/Header";
import Cabecera from "../components/Home/Cabecera";
import SecSection from "../components/Home/SecSection";
import Tarjetas from "../components/Home/Tarjetas";
import Footer from "../components/Footer";

function Home(){
    return(
        <>
        <Header/>
        <Cabecera/>
        <SecSection></SecSection>
        <Tarjetas />
        <Footer/>
        </>
    )
}

export default Home;