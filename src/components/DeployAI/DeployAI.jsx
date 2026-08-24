import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import useApi from '../../hooks/useApi'
import { toast } from 'react-toastify'

const DeployAI = () => {
    const [isAutomationOn, setIsAutomationOn] = useState(true)
    const { callApi } = useApi()

    useEffect(() => {
        const getUserDate = JSON.parse(localStorage.getItem("user"));
        setIsAutomationOn(getUserDate?.customerSupportAutomation || true);
    }, [])

    const handleToggle = async () => {
        const newAutomationState = !isAutomationOn;

        const response = await callApi({
            method: "POST",
            url: `${import.meta.env.VITE_API_BASE_URL}/seller/handleAutomation`,
            data: {
                isAutomationOn: newAutomationState,
            },
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response?.isSuccess) {
            setIsAutomationOn(response?.data?.customerSupportAutomation);
            localStorage.setItem("user", JSON.stringify(response?.data));
            toast.success(response?.message);
        }
    };


    return (
        <div className="shadow-sm border border-gray-100 rounded-lg p-4 sm:p-6 md:p-10 lg:p-12 xl:p-15">
            <div className="flex items-center justify-between py-4 max-w-5xl mx-auto">
                <span className="text font-medium text-gray-900">
                    Auto Customer Support Replies
                </span>
                <Button
                    variant="secondary"
                    className="bg-gray-900 text-white hover:bg-gray-800"
                    onClick={handleToggle}
                >
                    {isAutomationOn ? 'Turn Off' : 'Turn On'}
                </Button>
            </div>
        </div>
    )
}

export default DeployAI
