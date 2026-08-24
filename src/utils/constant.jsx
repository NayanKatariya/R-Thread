import { BsFillLightningChargeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { PiLightbulbFilamentFill } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { LuInbox } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaArrowsRotate } from "react-icons/fa6";
const regionGetUrl = {
  A2EUQ1WTGCTBG2: "https://flagcdn.com/ca.svg", // Canada
  ATVPDKIKX0DER: "https://flagcdn.com/us.svg", // United States
  A1AM78C64UM0Y8: "https://flagcdn.com/mx.svg", // Mexico
  A2Q3Y263D00KWC: "https://flagcdn.com/br.svg", // Brazil
  A1RKKUPIHCS9HS: "https://flagcdn.com/es.svg", // Spain
  A1F83G8C2ARO7P: "https://flagcdn.com/gb.svg", // United Kingdom
  A13V1IB3VIYZZH: "https://flagcdn.com/fr.svg", // France
  AMEN7PMS3EDWL: "https://flagcdn.com/be.svg", // Belgium
  A1805IZSGTT6HS: "https://flagcdn.com/nl.svg", // Netherlands
  A1PA6795UKMFR9: "https://flagcdn.com/de.svg", // Germany
  APJ6JRA9NG5V4: "https://flagcdn.com/it.svg", // Italy
  A2NODRKZP88ZB9: "https://flagcdn.com/se.svg", // Sweden
  AE08WJ6YKNBMC: "https://flagcdn.com/za.svg", // South Africa
  A1C3SOZRARQ6R3: "https://flagcdn.com/pl.svg", // Poland
  ARBP9OOSHTCHU: "https://flagcdn.com/eg.svg", // Egypt
  A33AVAJ2PDY3EV: "https://flagcdn.com/tr.svg", // Turkey
  A17E79C6D8DWNP: "https://flagcdn.com/sa.svg", // Saudi Arabia
  A2VIGQ35RCS4UG: "https://flagcdn.com/ae.svg", // United Arab Emirates
  A21TJRUUN4KGV: "https://flagcdn.com/in.svg", // India
  A19VAU5U5O7RUS: "https://flagcdn.com/sg.svg", // Singapore
  A39IBJ37TRP1C6: "https://flagcdn.com/au.svg", // Australia
  A1VC38T7YXB528: "https://flagcdn.com/jp.svg", // Japan
};

const uploadText = [
  "Provide a file and we'll fetch all the text data inside.",
  "Supported format is text PDF and DOCX up to 45 MB size.",
  "Images and multiple text columns are not supported.",
];

const headerText ={
  "/automation/customer-support":"Customer Support Automations",
  "/automation/deploy-ai":"Deploy AI",
  "/request-review":"Automate Review Request",
  "/setting":"Settings",
  "/automation/test-conversation":"Test ",
  "/message":"Inbox"

}

const sidebarItems = [
    {
        title: "Dashboard",
        url: "/request-review",
        icon: (color) => <LuLayoutDashboard color={color} size={30} />,
    },
    {
        title: "Reviews",
        url: "/request-review",
        icon: (color) => <FaRegStar color={color} size={30} />,
    },
    {
        title: "Inbox",
        url: "/message",
        icon: (color) => <LuInbox color={color} size={30} />,
    },
    {
        title: "Automations",
        url: "/automation",
        icon: (color) => <FaArrowsRotate color={color} size={30} />,
        child: [
            {
                title: "Setup",
                url: "/automation/customer-support",
                icon: (color) => <FaArrowsRotate color={color} size={30} />,
            },
            {
                title: "Test Conversation",
                url: "/automation/test-conversation",
                icon: (color) => <FaArrowsRotate color={color} size={30} />,
            },
            {
                title: "Deploy AI",
                url: "/automation/deploy-ai",
                icon: (color) => <FaArrowsRotate color={color} size={30} />,
            },
        ]
    },
    {
        title: "Get Started",
        url: "/",
        icon: (color) => <PiLightbulbFilamentFill color={color} size={30} />,
    },
    {
        title: "Settings",
        url: "/setting",
        icon: (color) => <IoIosSettings color={color} size={30} />,
    },
]



export { regionGetUrl,uploadText ,headerText,sidebarItems};
