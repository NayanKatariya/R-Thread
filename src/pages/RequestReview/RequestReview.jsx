import React, { useEffect, useState } from "react";
// import { Switch } from '@headlessui/react';
import moment from "moment";

import Header from "../../components/RequestReview/Header";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import defaultProductImage from "../../assets/images/default-product.jpg";
import { DataTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "../../components/ui/checkbox";

const RequestReview = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rowSelection, setRowSelection] = useState({});

    
    const { callApi } = useApi();

    const toggleAutomation = (afterDays, isAutomated) => {
        const orderIds = []
        const filteredOrders = orders?.filter((row, index) => rowSelection[index])
        filteredOrders?.forEach((order) => {
            order?.data?.forEach((item) => {
                orderIds.push(item?.orderId)
            })
        })
        scheduleReviewRequest(orderIds, afterDays, isAutomated);

    };
    const columnHelper = createColumnHelper();

    const columns = [
        {
            id: "select",
            size: 30,
            header: ({ table }) => (
                <Checkbox
                    className={"ml-2"}
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => {
                return (
                    <Checkbox
                        className={"ml-2"}
                        // defaultChecked={row.getIsSelected() || original?.data?.[0]?.isSchedule?.isAutomated}
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        // columnHelper.accessor(row => row?.data?.[0]?.isSchedule?.isAutomated, {
        //     id: 'Automated',
        //     header: 'Automated',
        //     size: 50,
        //     cell: info => {
        //         const row = info.row.original;
        //         const isAutomated = row?.data?.[0]?.isSchedule?.isAutomated;
        //         return (
        //             <div>
        //                 {/*
        //   <Switch
        //     checked={isAutomated}
        //     onChange={() =>
        //       toggleAutomation(
        //         row.data.map(item => item?.orderId),
        //         row.afterDays,
        //         !isAutomated
        //       )
        //     }
        //     className={`${isAutomated ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
        //   >
        //     <span
        //       className={`${isAutomated ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
        //     />
        //   </Switch>
        //   */}
        //             </div>
        //         );
        //     },
        // }),

        {
            accessorKey: "productName",
            header: "Product Name",
            size: 350,
            cell: (info) => {
                const row = info.row.original;
                const product = row.data?.[0];
                return (
                    <div className="flex items-center gap-4">
                        <img
                            src={product?.productImage || defaultProductImage}
                            alt="Product"
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                                e.target.src = defaultProductImage;
                            }}
                        />
                        <span className="text-sm text-gray-800 overflow-hidden text-ellipsis">
                            {product?.productName}
                        </span>
                    </div>
                );
            },
        },

        columnHelper.accessor((row) => 7, {
            header: "Send After (Days)",
            id: "Send After (Days)",
            size: 50,
        }),
        columnHelper.accessor(
            (row) => row?.data?.[0]?.isSchedule?.isAutomated || false,
            {
                header: "Automation Status",
                id: "Automation Status",
                size: 50,
            }
        ),
        columnHelper.accessor((row) => row?.data?.[0]?.shipDate, {
            id: "Shipment Date",
            header: "Shipment Date",
            size: 50,
            cell: (info) => moment(info.getValue()).format("DD-MM-YYYY"),
        }),

        columnHelper.accessor((row) => row?.data?.[0]?.orderTotal?.amount, {
            id: "Order Total",
            size: 50,
            header: "Order Total",
        }),

        columnHelper.accessor((row) => row?.data?.[0]?.asin, {
            id: "ASIN",
            size: 50,
            header: "ASIN",
        }),

        // columnHelper.accessor('afterDays', {
        //     header: 'Send After (Days)',
        //     size: 50,
        //     cell: info => {
        //         const row = info.row.original;
        //         const value = Number(row?.afterDays || row?.data?.[0]?.isSchedule?.afterDays);
        //         return (

        //             // <select
        //             //     value={value}
        //             //     onChange={e =>
        //             //         setOrders(prev =>
        //             //             prev.map(p =>
        //             //                 p?.shipDate === row.shipDate
        //             //                     ? { ...p, afterDays: Number(e.target.value) }
        //             //                     : p
        //             //             )
        //             //         )
        //             //     }
        //             //     className="border border-gray-300 text-sm rounded-xl focus:outline-none px-2 py-1"
        //             // >
        //             //     <option>None</option>
        //             //     <option value={1}>After 1 day</option>
        //             //     <option value={3}>After 3 days</option>
        //             //     <option value={5}>After 5 days</option>
        //             // </select>
        //         );
        //     },
        // }),
    ];

    useEffect(() => {
        getAllOrders();
    }, [page, limit, debouncedSearch, filter]);

    const getAllOrders = async () => {
        const response = await callApi({
            method: "POST",
            url: `${import.meta.env.VITE_API_BASE_URL}/order/getOrders`,
            data: {
                search: debouncedSearch,
                filter: filter,
                page: page,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response?.isSuccess) {
            setTotal(response?.data?.total);
            setOrders(response?.data?.orders);
        }
    };

    const scheduleReviewRequest = async (orderId, afterDays, isAutomated) => {
        const response = await callApi({
            method: "POST",
            url: `${import.meta.env.VITE_API_BASE_URL
                }/schedule/create-schedule-review`,
            data: {
                orderId: orderId,
                afterDays: afterDays,
                isAutomated: isAutomated,
            },
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response?.isSuccess) {
            toast.success(response?.message);
            getAllOrders();
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to first page on new search
        }, 500); // Debounce delay (500ms)

        return () => {
            clearTimeout(handler); // Cleanup if search changes quickly
        };
    }, [search]);

    return (
        <div className="">
            <DataTable
                columns={columns}
                data={orders}
                toggleAutomation={toggleAutomation}
                setRowSelection={setRowSelection}
                rowSelection={rowSelection}
                total={total}
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
                setSearch={(search) => setSearch(search)}
                setFilter={setFilter}
                search={search}
                filter={filter}
            />
            {/* <DataTable
                columns={columns}
                data={orders}
                noHeader
                className="rounded-lg "
                customStyles={customStyles}
                pagination
                paginationServer
                // paginationComponentOptions={paginationComponentOptions}
                onChangePage={(page) => setPage(page)}
                paginationTotalRows={total}
                onChangeRowsPerPage={(limit) => setLimit(limit)}
            /> */}
        </div>
    );
};

export default RequestReview;
