import HomePageProvider from "../providers/HomePageProvider";
import { Outlet } from "react-router";

export default function HomePageLayout() {
   return (
      <HomePageProvider>
            <Outlet />
      </HomePageProvider>
   );
}