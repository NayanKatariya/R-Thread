import React from 'react'
import { regionGetUrl } from '../../utils/constant'
import { LuCirclePlus } from 'react-icons/lu'
import { handleLoginWithGoogle } from '../../utils/loginWithGoogle'

const CardComponent = ({ sellerId, id, marketplaceId, handleRemove, sellerEmail,removeGoogleAccount }) => {
    return (
        <div className='p-4 border border-gray-200 rounded-lg'>
            <div

                className="flex items-center justify-between "
            >
                <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center mr-3 rounded-full overflow-hidden">
                        <img
                            src={regionGetUrl[marketplaceId]}
                            alt={``}

                            className="object-cover w-[40px] h-[40px]"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-medium">{sellerId}</p>
                        <p className="text-sm text-gray-500">{marketplaceId}</p>
                    </div>
                </div>

                <button
                    onClick={() => handleRemove(id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                    Remove
                </button>
            </div>

            {!sellerEmail ? <button onClick={() => handleLoginWithGoogle(`${import.meta.env.VITE_WEB_URL}/setting`, id)} className="bg-blue-600/10 hover:bg-blue-700/15 flex items-center justify-center gap-2 text-blue-600  hover:bg-blue-700 mt-5 mb-2 w-full px-4 py-2 rounded-md text-sm transition-colors" >
                <LuCirclePlus color="#155dfc" size={19} />
                Connect Google Account
            </button> :
                <div className='border-t border-gray-200 mt-3 pt-3'>
                    <p className="text-gray-600 text-sm font-semibold">Seller Email</p>
                    <div className='flex items-center justify-between '>
                        <p className="text-gray-400 text-sm font-medium"> {sellerEmail}</p>
                        <button
                            onClick={() => removeGoogleAccount(id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CardComponent
