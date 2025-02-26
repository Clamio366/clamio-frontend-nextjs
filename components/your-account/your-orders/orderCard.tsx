import React, { useState } from 'react';
import UserInfoDialog from '@/components/shared/UserInfoDialogProps';
import { OrderDemo } from '@/lib/types';
import { TItem, TOrder } from '@/types/order';
import { downloadFile } from '@/action/order';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTransition } from "react";
import Link from 'next/link';

interface OrderCardProps {
    order: TItem;
    activeTab: string;
    // userId: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, activeTab }) => {
    const [isPending, startTransition] = useTransition();

    const downloadUrl = `https://clamio-backend-vt4d.onrender.com/api/v1/downloadable/download/${order.product_id}`

    const handleSubmit = () => {
        // Open the download link in a new tab
        window.open(downloadUrl, '_blank');
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [status, setStatus] = useState('Processing');

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    // const handleSubmit = () => {
    //     setStatus('Processing');
    //     handleCloseDialog();
    // };

    const getStatusClass = () => {
        let statusClass = '';
        if (status === 'Pending') {
            statusClass = 'bg-red-200 text-red-800 font-medium font-semibold ';
        } else if (status === 'Processing') {
            statusClass = 'bg-orange-200 text-red-800 font-medium font-semibold';
        } else if (status === 'Complete') {
            statusClass = 'bg-green-200 text-red-800 font-medium font-semibold';
        }
        return statusClass;
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg ">
             {/* <UserInfoDialog 
                isOpen={isDialogOpen} 
                onClose={handleCloseDialog} 
                userId={order.product_id} // Add this line
            /> */}
            <div className="flex gap-10 sm:flex-row sm:justify-between mb-4">
                {/* Other content */}
            </div>
            <div className="flex flex-col sm:flex-row items-start">
                <img src={order.images_url[0]} alt="image" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mb-4 sm:mb-0" />
                <div className="ml-0 sm:ml-4 flex-1">
                    <p className="font-medium text-gray-800 text-lg">{order.title}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                    <Button onClick={handleSubmit}  className="text-white bg-black mt-2" >Download</Button>

                            {/* <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" onClick={handleOpenDialog}>User Info</button> */}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between sm:flex-row gap-2 mt-4">
                {/* {activeTab === 'my-bookings' ? (
                    <div className={`text-sm mt-1 p-2 rounded ${getStatusClass()}`}>
                        {status}
                    </div>
                ) : (
                    <button className="text-blue-600 hover:underline text-sm">View Return/Refund Status</button>
                )} */}
                {/* <button className="text-blue-600 hover:underline text-sm">Write a product review</button> */}
            </div>
            {/* <button className="text-blue-600 hover:underline text-sm mt-4 block">Archive order</button> */}
        </div>
    );
};

export default OrderCard;
