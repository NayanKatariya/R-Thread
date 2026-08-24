
import { Link, useLocation } from "react-router-dom"


import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import logo from "@/assets/images/logo.png"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { sidebarItems } from "@/utils/constant";
import { SidebarFooter, SidebarHeader } from "../components/ui/sidebar";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { TbHexagon } from "react-icons/tb";
import { BsHexagon, BsStars } from "react-icons/bs";



export function AppSidebar() {
    const location = useLocation();
    const { toggleSidebar, open } = useSidebar();
    return (
        <Sidebar collapsible="icon" variant="sidebar" side="left">
                 <SidebarHeader>
                    <div className={` ${open ? "mb-1" : "mb-6 mt-3"}   flex justify-between`} onClick={toggleSidebar}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 w-9  object-contain self-center max-w-full aspect-[8.13] "
                        />
                        <div className="">
                            <SidebarTrigger />

                        </div>

                    </div>
                 </SidebarHeader>
            <SidebarContent>
                    
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => {
                                const isActive = item?.child ? item?.child?.some(child => child?.url === location.pathname) : location.pathname === item?.url

                                return (
                                    <Collapsible disabled={!item?.child} defaultOpen className="group/collapsible">

                                        <SidebarMenuItem key={item?.title} className={""}>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton asChild disabled={item?.child} isActive={isActive} className={`${isActive ? " py-6" : "py-6"} `}>
                                                    <Link to={item?.child ? "#" : item?.url} >
                                                        {item?.icon()}
                                                        <span className="text-base">{item?.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {item?.child && <SidebarMenuSub className={"mt-1"}>
                                                    {item?.child?.map((child) => (
                                                        <Link to={child?.url} className="w-full">
                                                            <SidebarMenuButton className={"py-5"} isActive={location.pathname === child?.url}>
                                                                <span className="text-base">{child?.title}</span>
                                                            </SidebarMenuButton>
                                                        </Link>
                                                    ))}
                                                </SidebarMenuSub>}
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            })}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className={"flex items-center gap-3 group-data-[collapsible=icon]:mx-0! h-14! mx-2 my-3 "}>
                            <Avatar className={"size-10"}>

                                <AvatarFallback className="relative border p-1.5 ">
                                    <BsHexagon  size={25} />
                                    <div className="absolute top-5 left-5 -translate-x-1/2 -translate-y-1/2">
                                    <BsStars size={13}/>

                                    </div>

                                </AvatarFallback>
                            </Avatar>
                            <div className="text-start flex flex-col max-w-[130px] overflow-hidden">
                                <p className="text-sm font-medium">Upgrade Plan</p>
                                <p className="text-xs mt-1 text-muted-foreground">More access to the best models</p>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    )
}