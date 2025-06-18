import React from "react";

const ProductGridDetails = ({ product }) => {
  console.log("ProductGridDetails products:", product);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {product?.map((item) => (
        <div key={item._id} className="p-4 border rounded">
          <img
            src={item.images?.[0]?.url || "https://via.placeholder.com/150"}
            alt={item.images?.[0]?.altText || item.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p>${item.reducePrice || item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGridDetails;
