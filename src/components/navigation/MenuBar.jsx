const MenuBar = ({children}) => {
  return ( 
    <div className="w-full z-20 md:px-0 px-2 mt-2">
      <div className="border-2 border-border flex md:w-3/4 w-full mx-auto justify-between items-center p-2 rounded-2xl">
        {children}
      </div>
    </div>
   );
}
 
export default MenuBar;