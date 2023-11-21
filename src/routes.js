import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Room from "views/admin/room";
import Topic from "views/admin/topic";
import Users from "views/admin/users";
import RequestTopic from "views/admin/room copy";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdGroups,
  MdLabel,
} from "react-icons/md";
import RoomMembers from "views/admin/room-members";
import RoomCreate from "views/admin/room-create";
import RoomQuestions from "views/admin/room-question";
import QuestionDetails from "views/admin/room-question/QuestionDetails";
import RoomEdit from "views/admin/room-edit";
import EditUser from "views/admin/user-edit";
import RoomDetails from "views/admin/room-details";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Manage Room",
    layout: "/admin",
    path: "manage-room",
    icon: <MdGroups className="h-6 w-6" />,
    component: <Room />,
  },
  {
    name: "Manage Topic",
    layout: "/admin",
    path: "manage-topic",
    icon: <MdLabel className="h-6 w-6" />,
    component: <Topic />,
  },
  {
    name: "Manage Users",
    layout: "/admin",
    path: "manage-users",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Users />,
  },
  {
    name: "Edit User",
    layout: "/admin",
    path: "manage-users/:id/edit",
    icon: <MdPerson className="h-6 w-6" />,
    component: <EditUser />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="w-6 h-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="w-6 h-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="w-6 h-6" />,
  //   component: <Profile />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="w-6 h-6" />,
  //   component: <SignIn />,
  // },
  {
    name: "Member List",
    layout: "/admin",
    path: "manage-room/:id/members",
    icon: <MdGroups className="h-6 w-6" />,
    component: <RoomMembers />,
  },
  {
    name: "Request Topic List",
    layout: "/admin",
    path: "request-topic",
    icon: <MdGroups className="h-6 w-6" />,
    component: <RequestTopic />,
  },
  {
    name: "Create Room",
    layout: "/admin",
    path: "manage-room/create",
    icon: <MdGroups className="h-6 w-6" />,
    component: <RoomCreate />,
  },
  {
    name: "Edit Room",
    layout: "/admin",
    path: "manage-room/:id/edit",
    icon: <MdGroups className="h-6 w-6" />,
    component: <RoomEdit />,
  },
  {
    name: "Question List",
    layout: "/admin",
    path: "manage-room/:id/questions",
    icon: <MdGroups className="h-6 w-6" />,
    component: <RoomQuestions />,
  },
  {
    name: "Question Details",
    layout: "/admin",
    path: "manage-room/:id/questions/:questionId",
    icon: <MdGroups className="h-6 w-6" />,
    component: <QuestionDetails />,
  },
  {
    name: "Room Details",
    layout: "/admin",
    path: "manage-room/:id",
    icon: <MdGroups className="h-6 w-6" />,
    component: <RoomDetails />,
  },
];
export default routes;
