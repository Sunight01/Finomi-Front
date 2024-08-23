import UserMenu from "../../Navbar/UserMenu";
import MenuNavbar from "../../Navbar/MenuNavbar";

const Template = (props) => {
  return (
    <>
      <div className="flex min-h-screen w-full bg-main-white flex border-box ">
        <aside className="bg-main-white w-24 min-h-full px-6 py-12 flex flex-col justify-between relative border-box">
          <MenuNavbar />
          <UserMenu />
        </aside>
        <div className="bg-white w-100 min-h-auto w-full md:my-8 mr-8 sm:my-4 rounded-3xl border-gray-200 overflow-hidden">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Template;