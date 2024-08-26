import UserMenu from "../../Navbar/UserMenu";
import MenuNavbar from "../../Navbar/MenuNavbar";

const Template = (props) => {
  return (
    <>
      <div className="flex min-h-screen w-full bg-main-white flex border-box ">
        <aside className="bg-main-white w-24 h-screen px-6 py-12 flex flex-col justify-between fixed top-0 left-0 border-box">
          <MenuNavbar />
          <UserMenu />
        </aside>
        <div className="bg-white min-h-auto w-full md:my-8 mr-8 sm:my-4 rounded-3xl border-gray-200 overflow-hidden border-box ml-24">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Template;