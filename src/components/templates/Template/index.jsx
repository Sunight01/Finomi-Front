const Template = (props) => {
  return (
    <>
      <div className="flex min-h-screen w-full bg-main-white flex border-box">
        <aside className="bg-main-white w-24 min-h-auto relative p-4">
          <p>Sidebar</p>
        </aside>
        <div className="bg-white w-100 min-h-auto w-full md:m-8 sm:m-4 rounded-3xl border-gray-200 overflow-hidden">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Template;