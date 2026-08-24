import  { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { BsFillSendFill } from "react-icons/bs";
import { RiGeminiFill } from "react-icons/ri";

function MessageSidebar({ users, getMessages, currentUser }) {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-[#1B59F81A]  h-10 w-10">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">QuickChat</div>
      </div>
      {currentUser && <div className="flex flex-col items-center bg-[#1B59F81A]  border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="text-sm font-semibold my-2 truncate max-w-[250px]">
          {currentUser?.receiver}
        </div>
        <div className="text-xs text-gray-500">{currentUser?.type}</div>
      </div>}
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[calc(100vh-370px)] overflow-y-auto">
          {users?.length ? users?.map((user) => (
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              onClick={() => getMessages(user)}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {user.receiver.charAt(0)}
              </div>
              <div>
                <div className="ml-2 text-sm font-medium truncate max-w-[200px]">
                  {user.receiver}
                </div>
                <div className="ml-2 text-xs my-2 font-medium truncate max-w-[200px]">
                  {user.type}
                </div>
              </div>
            </button>
          )) :
            <div className="flex flex-row items-center justify-center text-sm">
              <span className="font-base">No Active Conversations</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

const Message = () => {
  const { callApi } = useApi();
  const [allMessages, setAllMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getUserEmailforMessages();
  }, []);



  const getUserEmailforMessages = async () => {
    const response = await callApi({
      method: "GET",
      url: `${import.meta.env.VITE_API_BASE_URL}/message/user`,

      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.isSuccess) {
      getMessages(response?.data[0]);
      setUsers(response?.data);
    }
  };

  const handleSendMessage = async () => {
    const response = await callApi({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/message/sendMessage`,
      data: {
        message,
        sender: currentUser?.account?.sellerEmail,
        receiver: currentUser?.receiver,
        orderId: currentUser?.orderId,
        type: currentUser?.type,
        accountId: currentUser?.account?._id,
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.isSuccess) {
      setMessage('')
      getMessages(currentUser)
    }

  };

  const getMessages = async (data) => {
    setCurrentUser(data);
    setAllMessages([]);
    const response = await callApi({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/message/user`,
      data: {
        email: data?.receiver,
        type: data?.type,
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.isSuccess) {
      setAllMessages(response?.data);
    }
  };

  const createMessage = async () => {
    const response = await callApi({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/message/create`,
      data: {
        email: currentUser?.buyerEmail,
        type: currentUser?.type,
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.isSuccess) {
      getMessages(response?.data);
    }
  };
  const generateAIMessage = async () => {
    const lastMessage = allMessages?.findLast(msg => msg?.sender === currentUser?.receiver)
    const response = await callApi({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/message/generate`,
      data: {
        prompt: lastMessage?.message,
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.isSuccess) {
      setMessage(response?.data);
    }
  };

 
  return (
    <div className="flex h-[calc(100vh-90px)] antialiased text-gray-800">
     
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <MessageSidebar
          users={users}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          createMessage={createMessage}
          getMessages={getMessages}
        />
        {currentUser && <div className="flex flex-col flex-auto h-full px-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {allMessages?.map((item, index) => {
                    const receiver = item?.sender === currentUser?.receiver;
                    return (
                      <div
                        className={
                          !receiver
                            ? "col-start-6 col-end-13 p-3 rounded-lg"
                            : "col-start-1 col-end-8 p-3 rounded-lg"
                        }
                      >
                        <div
                          className={`flex ${receiver ? "flex-row" : "flex-row-reverse"
                            } items-center`}
                        >
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1B59F81A] text-[#1B59F8] flex-shrink-0">
                            {receiver
                              ? item?.receiver?.charAt(0).toUpperCase()
                              : (item?.accountId?.sellerEmail
                                ?.charAt(0)
                                .toUpperCase() || user?.fullName?.charAt(0).toUpperCase())}
                          </div>
                          <div
                            className={`relative ${receiver ? "ml-3 bg-white" : "mr-3 bg-[#1B59F81A]"
                              } text-sm  py-2 px-4 shadow rounded-xl`}
                          >
                            <div>{item?.message}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow">
                <div className="relative w-full">
                  <div className="border rounded-xl focus:outline-none focus:border-indigo-300">
                    <input
                      type="text"
                      className="flex w-[92%] focus:outline-none pl-4 h-10"
                      onChange={(e) => setMessage(e?.target?.value)}
                      value={message}
                    />
                    <button className="absolute flex items-center justify-center  border rounded-lg  right-2 top-[7.5px] text-xs gap-1 px-2 p-1 text-gray-400 hover:text-gray-600" onClick={generateAIMessage}>Use AI <RiGeminiFill /></button>

                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button disabled={!message} className={`flex items-center justify-center bg-[#1B59F8] text-[#1B59F8] ${!message && "opacity-50 cursor-not-allowed"} rounded-xl text-white px-4 py-1 flex-shrink-0`} onClick={handleSendMessage}>
                  <span>Send</span>
                  <span className="ml-2">
                    <BsFillSendFill />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Message;
