import { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { BsBookHalf, BsFillCloudArrowUpFill } from 'react-icons/bs';
import { IoArrowBack } from "react-icons/io5";
import { uploadText } from '../../utils/constant';
import useApi from '../../hooks/useApi';
import Select from '../common/Select';
import { RiLoader4Fill } from 'react-icons/ri';


const FileUploadModal = ({ isOpen, setIsOpen, onUpload, selectedProduct, setSelectedProduct, loading }) => {
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);

    const { callApi } = useApi()

    useEffect(() => {
        getProducts();
    }, [])

    const fileRef = useRef(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleFileDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    useEffect(() => {
        return () => {
            setFile(null);
        }
    }, [isOpen]);

    const onClose = () => {
        setIsOpen(false);
        setFile(null);
    }

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
            setProducts(response?.data?.map((product) => ({ value: product?._id, label: `(${product?.asin}) ${product?.itemName} `, asin: product?.asin })));
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-[900px] sm:max-w-[900px] p-0">
                    <DialogHeader>
                        <div className='flex m-5 gap-2 align-center'>
                            <IoArrowBack size={22} onClick={() => setIsOpen(false)} className='cursor-pointer' />
                            <DialogTitle className="mt-0.5" >Upload document</DialogTitle>
                        </div>
                        <Separator />
                        <div className="p-2">
                            <div className="max-w-[370px] ml-3 mb-1">
                                <Select
                                    options={products}
                                    value={selectedProduct}
                                    onChange={setSelectedProduct}
                                    placeholder="Select a Product"
                                />
                            </div>
                            <div className='flex grid grid-cols-2 p-4 gap-8'>

                                <div
                                    className="border-dashed border border-gray-300 p-8 h-[200px] rounded-lg  flex flex-col items-center justify-center text-center cursor-pointer"
                                    onDragOver={handleFileDragOver}
                                    onDrop={handleFileDrop}
                                >
                                    <Input
                                        type="file"
                                        ref={fileRef}
                                        accept=".pdf,.docx"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        id="fileInput"
                                    />
                                    <Label htmlFor="fileInput" className="text-gray-600 flex-col">
                                        <Button className="mt-2 rounded-full text-[14px] py-1" onClick={() => fileRef.current.click()}>
                                            <BsFillCloudArrowUpFill color="white" size={50} className='' />
                                            Select a file
                                        </Button>
                                        <div className="my-4">or drag and drop it here</div>
                                    </Label>
                                    {file && (
                                        <div className="mt-4 max-w-full">
                                            <strong>File Selected:</strong>
                                            <span className="ml-1 inline-block max-w-xs truncate overflow-hidden whitespace-nowrap align-middle">
                                                {file.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 text-sm text-gray-600 ml-6 mr-10 ">
                                    <ul className='list-disc text-[15px] space-y-2  ' >
                                        {
                                            uploadText?.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className='flex justify-between align-center gap-4'>
                            <div className='flex m-5 gap-2 align-center'>
                                <BsBookHalf size={20} className='mt-1' />
                                <p>Learn more about documents for Fin</p>
                            </div>
                            <div className='flex m-5 gap-2 align-center'>
                                <Button className="rounded-full text-[14px] font-semibold py-1" variant={"secondary"} onClick={() => onClose()} disabled={loading}>
                                    Cancel
                                </Button>

                                <Button className="rounded-full text-[14px] font-semibold py-1" variant={"secondary"} disabled={!file} onClick={() => onUpload(file, "B0CMJTSVRW")}>
                                    {loading ? <RiLoader4Fill className="animate-spin text-black" size={18} /> : "Upload"}
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </  >
    );
};

export default FileUploadModal;
