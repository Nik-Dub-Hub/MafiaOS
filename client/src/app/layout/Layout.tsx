import Footer from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";
import { Outlet } from "react-router";
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
import { useEffect } from "react";
import { IUser } from "../../entities/user/model";
import { signInThunk } from "../../entities/user/api/index";

export default function Layout() {
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    const testUser: Omit<IUser, "id"> = {
      username: "TestUser",
      email: "test@example.com",
      img:"",
      civilianCount:0,
      ladyCount:0,
      mafiaCount:0,
      doctorCount:0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch(signInThunk({username: testUser.username, password: 'password'} as any));
  }, [dispatch]);
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}
