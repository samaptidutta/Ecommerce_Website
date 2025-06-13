import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        price: '',
        sku: '',
        brand: '',
        category: '',
        stock: '',
        image: '',
        description: '',
    });

    const [selectedImage, setSelectedImage] = useState(null); // 🖼️ For preview

    useEffect(() => {
        // Simulated fetch data
        setProduct({
            name: 'Product 1',
            price: 100,
            sku: '123123123',
            brand: 'Samsung',
            category: 'Smartphone',
            stock: 50,
            image: 'https://via.placeholder.com/150',
            description: 'This is a sample smartphone product.',
        });
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);

            // This is optional: if you want to actually send it to server later
            setProduct({ ...product, image: imageUrl });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated product:", product);
        navigate('/admin/products');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-10 rounded">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <InputField label="Product Name" name="name" value={product.name} onChange={handleChange} required />
                <InputField label="Price" name="price" type="number" value={product.price} onChange={handleChange} required />
                <InputField label="SKU" name="sku" value={product.sku} onChange={handleChange} required />
                <InputField label="Brand" name="brand" value={product.brand} onChange={handleChange} />
                <InputField label="Category" name="category" value={product.category} onChange={handleChange} />
                <InputField label="Stock" name="stock" type="number" value={product.stock} onChange={handleChange} />

                <div className="md:col-span-2">
                    <label className="block font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        rows={4}
                    />
                </div>

                {/* 🖼️ Image Upload Section */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-2">Upload New Image</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <div className="flex gap-4 mt-4">
                        <img
                            src={selectedImage || product.image}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded border"
                        />
                    </div>
                </div>

                {/* Submit & Back Button */}
                <div className="md:col-span-2 flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                        <FiArrowLeft /> Back
                    </button>
                </div>
            </form>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, type = "text", required }) => (
    <div>
        <label className="block font-medium">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full border border-gray-300 rounded px-3 py-2"
        />
    </div>
);

export default ProductEdit;
