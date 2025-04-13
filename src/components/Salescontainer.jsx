import React, { useState, useEffect } from 'react';
import './Salecontainer.css';

function Salecontainer() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('default');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://steam-sales-api.vercel.app/api/all-deals');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(Object.values(result));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Ordenar los datos según el estado `sortOrder`
    const sortedData = [...data].sort((a, b) => {
        if (sortOrder === 'cheap-to-expensive') {
            return parseFloat(a.salePrice) - parseFloat(b.salePrice);
        } else if (sortOrder === 'expensive-to-cheap') {
            return parseFloat(b.salePrice) - parseFloat(a.salePrice);
        } else if (sortOrder === 'low-rating') {
            return parseFloat(a.steamRatingPercent) - parseFloat(b.steamRatingPercent);
        } else if (sortOrder === 'high-rating') {
            return parseFloat(b.steamRatingPercent) - parseFloat(a.steamRatingPercent);
        }
        return 0; // Sin orden si es "default"
    });

    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="sale-container">
        <h1>Steam Sales</h1>
        <div className="filters">
            <label htmlFor="sort">Sort by: </label>
            <select id="sort" value={sortOrder} onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="cheap-to-expensive">Price: Low to High</option>
                <option value="expensive-to-cheap">Price: High to Low</option>
                <option value="low-rating">Steam Rating: Low to High</option>
                <option value="high-rating">Steam Rating: High to Low</option>
            </select>
        </div>
         <span>
                Page {currentPage} of {totalPages}
            </span>
        <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
           
            <button
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 25, 1))}
                disabled={currentPage <= 25}
            >
                -25
            </button>
            
            <button
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 10, 1))}
                disabled={currentPage <= 10}
            >
                -10
            </button>
           
            <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 10, totalPages))}
                disabled={currentPage + 10 > totalPages}
            >
                +10
            </button>
            <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 25, totalPages))}
                disabled={currentPage + 25 > totalPages}
            >
                +25
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                Last
            </button>
        </div>
        <table className="sales-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Thumbnail</th>
                    <th>Price</th>
                    <th>Savings (%)</th>
                    <th>Steam Rating</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((game) => (
                    <tr key={game.dealID}>
                        <td>{game.title}</td>
                        <td>
                            <img src={game.thumb} alt={game.title} className="thumbnail" />
                        </td>
                        <td>
                            ${game.salePrice} <s>${game.normalPrice}</s>
                        </td>
                        <td>{parseFloat(game.savings).toFixed(2)}%</td>
                        <td>{game.steamRatingText} ({game.steamRatingPercent}%)</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default Salecontainer;