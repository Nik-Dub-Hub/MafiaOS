import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import { MainPage } from "@/pages";
import RoleCard from "@/entities/role/ui/RoleCard";
import ChoicePage from "@/pages/ChoicePage/ChoicePage";
import WidthChecker from "@/widgets/WidthTracker/WidthChecker";
import TooWidePage from "@/pages/TooWidePage/TooWidePage";
import GamePage from "@/pages/GamePage/GamePage";

export default function router() {
  return (
    <BrowserRouter>
      <WidthChecker />
      <Routes>
        <Route path={CLIENT_ROUTES.MAIN} element={<Layout />}>
          <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.ROLE_CARD} element={<RoleCard />} />
          <Route path={CLIENT_ROUTES.CHOICE_PAGE} element={<ChoicePage />} />
          <Route path={CLIENT_ROUTES.GAME} element={<GamePage />} />
        </Route>
          <Route path={CLIENT_ROUTES.TOOWIDE_PAGE} element={<TooWidePage />} />
      </Routes>
    </BrowserRouter>
  );
}
