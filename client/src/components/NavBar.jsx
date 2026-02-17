import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, SendIcon, PaintRollerIcon, SidebarCloseIcon, SidebarOpenIcon, UserIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { setSidebarVisible, isSidebarVisible } = useChatStore();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  }

  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <NavLink to="/home" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <SendIcon className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">SendTo</h1>
            </NavLink>
          </div>

          <div className="flex items-center gap-2">

          { authUser && 
          <div onClick={toggleSidebar}>
                { isSidebarVisible 
                  ? <div className="btn btn-sm gap-2">
                      <SidebarCloseIcon className="size-5" />
                      <span className="hidden sm:inline">Close</span>
                    </div>
                  : <div className="btn btn-sm gap-2">
                      <SidebarOpenIcon className="size-5" />
                      <span className="hidden sm:inline">Open</span>
                    </div> }
          </div>
          }
            <NavLink
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors active-link`}
            >
              <PaintRollerIcon className="w-4 h-4"/>
              <span className="hidden sm:inline">Theme</span>
            </NavLink>

            {authUser && (
              <>
                <NavLink to={"/profile"} className={`active-link btn btn-sm gap-2`}>
                  <UserIcon className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </NavLink>
 
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOutIcon className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;