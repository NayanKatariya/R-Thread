import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import profileImg from "@/assets/images/profile.png";
import { Link } from "react-router-dom";

export default function DropdownMenuWithIcon() {
  const logoutHandler = () => {
    localStorage.clear();
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="focus:outline-none  rounded-full">
        <Avatar className="size-11">
          <AvatarFallback className="bg-[#ebebe8]"><img src={profileImg} /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="h-4 w-4" /> Billing
        </DropdownMenuItem>
        <Link to={"/setting"}>
          <DropdownMenuItem>
            <Settings className="h-4 w-4" /> Settings
          </DropdownMenuItem>
        </Link>
        <Link to={"/signin"} onClick={logoutHandler}>
          <DropdownMenuItem className="mt-16  border-t">
            <LogOut className="h-4 w-4" /> Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
