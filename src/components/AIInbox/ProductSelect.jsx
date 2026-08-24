import React, { useState } from "react";
import Select from "../common/Select";

const productOptions = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
];

export default function ProductSelect({}) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="max-w-[170px] ">
           
            <Select
                options={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                placeholder="Select a Product"
            />
        </div>
    );
}
