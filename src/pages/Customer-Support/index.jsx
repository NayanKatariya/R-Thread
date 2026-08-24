import { Card, CardContent } from "@/components/ui/card"
import { Button, } from "@/components/ui/button"

import { useState } from "react"
import FileUploadModal from "../../components/docAutomation/uploadModal"
import useApi from "../../hooks/useApi"
import { useNavigate } from "react-router-dom"

const CustomerSupport = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { callApi,loading } = useApi()
    const navigate = useNavigate()
    const [selectedProduct, setSelectedProduct] = useState(null);

    const steps = [
        {
            id: 1,
            text: "📄  Get started by uploading support documents for each ASIN you want the AI to handle. You can upload user manuals, FAQ docs, troubleshooting guides, and more.",
            button: "Get Started",
            onClick: () => setIsOpen(true)
        },
        {
            id: 2,
            text: "Test your AI in Conversation.",
            button: "Get Started",
            onClick: () => navigate("/automation/test-conversation")
        },
        {
            id: 3,
            text: "Deploy AI",
            button: "Get Started",
            onClick: () => { }
        }
    ]

    const onUpload = async (file, asin) => {
        try {
            const response = await callApi({
                method: "POST",
                url: `${import.meta.env.VITE_API_BASE_URL}/chat/upload`,
                data: {
                    file,
                    asin: selectedProduct?.asin,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'ngrok-skip-browser-warning': 'true',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response?.isSuccess) {
                setIsOpen(false);
                setSelectedProduct(null);
                navigate(`/automation/test-conversation/${selectedProduct?.asin}`);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
        }
    };



    return (
        <div className="space-y-4 ">
            <h1 className="text-lg font-base mb-6 md:text-2xl">Train AI to handle support by uploading your product documentation by ASIN</h1>
            <div className="space-y-6 px-6 mr-3">
                {steps?.map((step) => (
                    <Card key={step.id} className="shadow-md w-full min-h-[96px]">
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex gap-4 justify-between">
                                <p className="leading-9">{step?.id}. {step?.text}</p>
                                <Button className="rounded-xl mt-2" onClick={step?.onClick}>{step.button}</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <FileUploadModal isOpen={isOpen} setIsOpen={setIsOpen} onUpload={onUpload} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} loading={loading} />
        </div>
    )
}

export default CustomerSupport
