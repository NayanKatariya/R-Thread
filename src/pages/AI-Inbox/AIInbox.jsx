"use client";
import React, { useEffect, useState } from 'react';
import { ChatMessage } from '../../components/AIInbox/ChatMessage';
import { ChatInput } from '../../components/AIInbox/ChatInput';
import useApi from '../../hooks/useApi';
import ProductSelect from '../../components/AIInbox/ProductSelect';
import Select from '../../components/common/Select';
import { useParams } from 'react-router-dom';


const AIInbox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { asin } = useParams()

  const { callApi,loading } = useApi()

  useEffect(() => {
    getProducts();
  }, [])

  const handleSubmit = async (e) => {
    const payload = {
      "role": "user",
      message

    }
    const response = await callApi({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/chat/ask`,
      data: {
        question: message,
        asin: selectedProduct?.asin
      },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response?.isSuccess) {
      setMessage('');
      setMessages([...messages, payload, response?.data]);
    }
  };
  // const handleSubmit = async (e) => {
  //   const payload = {
  //     "role": "user",
  //     "content": [{
  //       "type": "text",
  //       "text": message
  //     }]
  //   }
  //   const response = await callApi({
  //     method: "POST",
  //     url: `${import.meta.env.VITE_API_BASE_URL}/message/generateMessageWithHistory`,
  //     data: [...messages, payload],
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'ngrok-skip-browser-warning': 'true',
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });

  //   if (response?.isSuccess) {
  //     console.log(" handleSubmit ~ response:", response)
  //     setMessage('');
  //     setMessages([...messages, payload, response?.data]);
  //   }
  // };

  const getProducts = async () => {
    const response = await callApi({
      method: "GET",
      url: `${import.meta.env.VITE_API_BASE_URL}/product/getProducts`,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.isSuccess) {
      if (asin) {
        const findProduct = response?.data?.find((product) => product?.asin === asin)
        setSelectedProduct({
          value: findProduct?._id,
          label: `(${findProduct?.asin}) ${findProduct?.itemName} `,
          asin: findProduct?.asin
        })
      }
      setProducts(response?.data?.map((product) => ({ value: product?._id, label: `(${product?.asin}) ${product?.itemName} `, asin: product?.asin })));
    }
  }

  return (
    <article className="flex flex-col items-start bg-white  justify-end  max-md:pr-5">
      <div className="absolute top-[30px] left-0 w-full z-999 ">
        <div className="max-w-[370px] ">
          <Select
            options={products}
            value={selectedProduct}
            onChange={setSelectedProduct}
            placeholder="Select a Product"
          />
        </div>
      </div>
      <section className="flex relative flex-col flex-wrap gap-5 justify-end  pr-3.5 w-full  max-md:max-w-full max-w-[1100px] mx-auto">

        <div className=" relative flex-col self-start  max-md:max-w-full h-[calc(100vh-230px)] overflow-y-auto  mx-auto w-full justify-end">
          {
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                lastMessage={index === messages.length - 1}
                isUser={message?.role === "user"}
                message={message?.message}
              />
            ))
          }
          {/* <ChatMessage
            isUser={true}
            message="Hi my phone is broken"
          />
          <ChatMessage
            isUser={false}
            message="Sorry to hear that—can you tell me what kind of phone you have and what exactly is wrong with it? (e.g., screen not turning on, won't charge, stuck in boot loop, etc.) I'll do my best to help troubleshoot"
          /> */}
        </div>
          <ChatInput message={message} setMessage={setMessage} handleSubmit={handleSubmit} loading={loading} selectedProduct={selectedProduct}/>
      </section>
    </article>
  );
};

export default AIInbox;
