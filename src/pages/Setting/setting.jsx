import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import CardComponent from "../../components/Setting/CardComponent";
import { LuCirclePlus } from "react-icons/lu";
import { handleLoginWithGoogle } from "../../utils/loginWithGoogle";

const Setting = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const { loading, callApi } = useApi();

    // Extract query parameters
    const params = new URLSearchParams(location?.search);
    // Extract query param ?code=xxxx
    const code = params.get('code');
    const state = params.get('state');

    useEffect(() => {
        if (code) {
            connectGoogleAccount(code, state);
        }
    }, [code]);

    const linkSellerAccountHandler = () => {
        window.location = `${import.meta.env.VITE_SELLER_URL}?application_id=${import.meta.env.VITE_APP_ID
            }&state=draft&version=beta&redirect_uri=${import.meta.env.VITE_WEB_URL}/setting`;
    };

    useEffect(() => {
        const spapi_oauth_code = params?.get("spapi_oauth_code");
        const selling_partner_id = params?.get("selling_partner_id");
        if (spapi_oauth_code && selling_partner_id) {
            connectSellerAccount(spapi_oauth_code, selling_partner_id);
        }
        getSellerAccounts();

    }, []);

    const connectSellerAccount = async (spapi_oauth_code, selling_partner_id) => {
        const response = await callApi({
            method: "POST",
            url: `${import.meta.env.VITE_API_BASE_URL}/seller/connect`,
            data: {
                country: "US",
                code: spapi_oauth_code,
                sellerId: selling_partner_id,
            },
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response?.isSuccess) {
            toast.success(response?.message);
        }
        getSellerAccounts();
        navigate("/setting");

    };

    const getSellerAccounts = async () => {
        const response = await callApi({
            method: "GET",
            url: `${import.meta.env.VITE_API_BASE_URL}/seller/accounts`,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response?.isSuccess) setAccounts(response?.data);
    };


    const handleRemove = async (id) => {
        const response = await callApi({
            method: "DELETE",
            url: `${import.meta.env.VITE_API_BASE_URL}/seller/remove-account/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response?.isSuccess) {
            toast.success(response?.message);
            getSellerAccounts();
        }
    };

    const removeGoogleAccount = async (id) => {
        const response = await callApi({
            method: "DELETE",
            url: `${import.meta.env.VITE_API_BASE_URL}/seller/remove-google-account/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response?.isSuccess) {
            toast.success(response?.message);
            getSellerAccounts();
        }
    };

    const connectGoogleAccount = async (code, state) => {
        const response = await callApi({
            method: "POST",
            url: `${import.meta.env.VITE_API_BASE_URL}/seller/connect-google`,
            data: {
                code,
                accountId: state
            },
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response?.isSuccess) {
            toast.success(response?.message);
            getSellerAccounts();
            navigate("/setting");
        }
    }
    // Add your connection logic here

    return (
        <>
            <div className="  mt-8  p-6">
                <div className="max-w-2xl  rounded-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 mt-4">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Available to Connect
                        </h2>

                        <div className="mb-4">
                            {/* <h3 className="font-medium text-gray-800">{selectedRegion}</h3> */}
                        </div>

                        <div className="space-y-3">
                            {accounts.map((marketplace) => (
                                <CardComponent
                                    key={marketplace.id}
                                    id={marketplace?._id}
                                    marketplaceId={marketplace.marketplaceId}
                                    sellerId={marketplace.sellerId}
                                    sellerEmail={marketplace.sellerEmail}
                                    handleRemove={handleRemove}
                                    removeGoogleAccount={removeGoogleAccount}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-center p-4 border border-gray-200 my-4 rounded-lg">
                            <button
                                className="bg-blue-600/10 hover:bg-blue-700/15 text-blue-600  w-full flex justify-center gap-2 px-4 py-2 rounded-md text-sm transition-colors"
                                onClick={linkSellerAccountHandler}
                            >
                                <LuCirclePlus color="#155dfc" size={19} />
                                Connect New Seller Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Setting;
