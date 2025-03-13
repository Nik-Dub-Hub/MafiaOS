import { AlertContainer } from "@/features/alerts";
import Footer from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";
import { Outlet } from "react-router";

export default function Layout() {

  return (
    <>
      <Header/>
      <AlertContainer/>
      <Outlet/>
      <Footer/>
    </>
  )
}
