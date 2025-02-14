"use client"
// Components
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
//Icons
import { GridIcon, ListIcon, HeartIcon, HeartSlashIcon, UnlimitedIcon, MenuBoardIcon } from "@/components/icons/Icons";

const FilterNavbar = () => {
  return ( 
    <div className="w-full z-20 md:px-0 px-2">
      <div className="border-2 border-border flex md:w-3/4 w-full mx-auto justify-between items-center p-2 rounded-2xl">
        <Button color="primary" variant="shadow" className="font-bold" endContent={<MenuBoardIcon />} >Create</Button>
        <div className="flex gap-4">
          <Tabs>
            <Tab key="All" title={<UnlimitedIcon className={"size-4"}/>} />
            <Tab key="Favorite" title={<HeartIcon className={"size-4"}/>} />
            <Tab key="Completed" title={<HeartSlashIcon className={"size-4"}/>} />
          </Tabs>
          <Tabs>
            <Tab key="Grid" title={<GridIcon className={"size-4"}/>} />
            <Tab key="List" title={<ListIcon className={"size-4"} />} />
          </Tabs>
        </div>
      </div>
    </div>
   );
}
 
export default FilterNavbar;