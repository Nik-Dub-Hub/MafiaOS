import { refreshTokensThunk } from "@/entities/user";
import { AlertContainer } from "@/features/alerts";
import { useAppDispatch} from "@/shared/hooks/reduxHooks";
import Footer from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";
import { useEffect } from "react";
import { Outlet } from "react-router";

export default function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return (
    <>
      <Header />
      <AlertContainer />
      <Outlet />
      <Footer />
    </>
  );
}
