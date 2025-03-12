import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import { MainPage } from "@/pages";



export default function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={CLIENT_ROUTES.MAIN} element={<Layout/>}>
            <Route path={CLIENT_ROUTES.MAIN} element={<MainPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
