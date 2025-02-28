import { useState, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { BiCart, BiSearch } from "react-icons/bi"; // Added BiSearch for the search icon
import { useAppDispatch } from "../redux/hook";
import { useGetAllProductsQuery } from "../redux/feature/productManage/productApi";
import Loading from "./Loading";
import { Badge } from "../components/ui/badge";
import { addToCart } from "../redux/feature/cart/cartSlice";

export interface IProduct {
  _id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  description?: string;
  model?: string;
  brand?: string;
  quantity: number;
}

export default function StationaryProducts() {
  const dispatch = useAppDispatch();

  // Filter State
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    inStock: "",
    minPrice: "",
    maxPrice: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // Items per page

  // Handle filter changes
  const handleFilterChange = (e: FieldValues) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Construct API Query Object
  const query = useMemo(() => {
    const params: Record<string, string> = { page: currentPage.toString(), limit: limit.toString() };
    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.category) params.category = filters.category;
    if (filters.inStock) params.inStock = filters.inStock === "In Stock" ? "true" : "false";
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    return params;
  }, [filters, currentPage]);

  // Fetch Data with Filters
  const { data, isLoading } = useGetAllProductsQuery(query);
  // console.log(data);
  const totalPages = data?.meta?.totalPage || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-4xl font-bold py-6 text-[#2c3e50] text-center">Stationary Products</h1>

        {/* Search and Filters */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
  <div className="flex flex-wrap gap-2 w-full">
    <input
      type="number"
      name="minPrice"
      placeholder="Min Price"
      className="px-4 py-2 text-[16px] border border-gray-300 rounded-md w-full md:w-36 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      value={filters.minPrice}
      onChange={handleFilterChange}
    />
    <span className="text-[16px] flex items-center"> - </span>
    <input
      type="number"
      name="maxPrice"
      placeholder="Max Price"
      className="px-4 py-2 text-[16px] border border-gray-300 rounded-md w-full md:w-36 shadow-sm"
      value={filters.maxPrice}
      onChange={handleFilterChange}
    />
  </div>
  <button
    onClick={() => setCurrentPage(1)}
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-[16px] w-full md:w-auto min-w-[120px]"
  >
    Filter by Price
  </button>
</div>



        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.data?.map((product: IProduct) => (
            <div
              key={product?._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all p-4 border border-gray-200"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover rounded-md hover:scale-[1.05] transition-all duration-300 cursor-pointer"
                />
                <Badge
                  className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold ${product?.inStock ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <div className="p-3">
                <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                <p className="text-sm text-gray-600 my-2">Category: {product.category}</p>
                <p className="text-lg font-medium text-gray-800">
                  Price: <span className="font-bold text-[#d63031]">{product.price} tk</span>
                </p>

                <div className="mt-3 flex gap-2">
                  <Link to={`/details/${product._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all">
                      View Details
                    </button>
                  </Link>

                  <button
                    className={`p-2 rounded-md ${!product?.inStock ? "bg-gray-400 cursor-not-allowed" : "bg-[#d63031] hover:bg-red-700"
                      } transition-all`}
                    disabled={!product?.inStock}
                    onClick={() => dispatch(addToCart({
                      ...product,
                      selectQuantity: 1, // Assuming this is your custom quantity
                      description: product.description || "No description available", // Default description if not provided
                      model: product.model || "", // Default to empty string if model is not provided
                      brand: product.brand || "Generic", // Default brand name for stationery
                      quantity: product.quantity, // Default quantity for this item in the cart
                    }))}>
                    <BiCart className="text-white text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-8 gap-4">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-600 transition-all duration-300">
            Prev
          </button>
          <span className="px-4 py-2 text-black">Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-600 transition-all duration-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
