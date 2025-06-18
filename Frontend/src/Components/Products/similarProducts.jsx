import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SimilarProducts = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`/api/products/similar/${productId}`);
        console.log("🔁 Similar Products:", response.data.data);
        setSimilarProducts(response.data.data); // ✅ Properly accessing `data.data`
      } catch (err) {
        console.error("Error fetching similar products:", err);
        setError("Failed to load similar products.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchSimilarProducts();
    }
  }, [productId]);

  if (loading) return <p>Loading similar products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Similar Products</h3>
      {similarProducts.length === 0 ? (
        <p>No similar products found.</p>
      ) : (
        <ul>
          {similarProducts.map((product) => (
            <li key={product._id}>
              <strong>{product.name}</strong> - ₹{product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimilarProducts;
