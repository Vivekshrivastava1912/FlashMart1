import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi, { baseURL } from '../common/SummaryApi';

const UserCategory = () => {
  const { categoryId } = useParams(); 
  const navigate = useNavigate();
  
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseURL + SummaryApi.getSubCategory.url, { method: SummaryApi.getSubCategory.method });
      const data = await response.json();
      
      if (data.success) {
        const allSubCats = data.data || [];
        
        // Sirf is category ki sub-categories filter ho rahi hain
        const filteredSubCats = allSubCats.filter((subCat) => {
          if (Array.isArray(subCat?.category)) {
            return subCat.category.some(cat => cat?._id === categoryId);
          }
          return subCat?.category === categoryId || subCat?.category?._id === categoryId;
        });

        setSubCategories(filteredSubCats);
      }
    } catch (error) { 
      console.error("SubCategory fetch error:", error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, [categoryId]);

  return (
    <div className="bg-slate-50 min-h-[80vh] py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Modern Header Area */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Explore Sub-Categories
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Select a sub-category to view products
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-500 font-medium animate-pulse">Loading amazing things...</p>
          </div>
        ) : subCategories.length === 0 ? (
          
          /* Empty State */
          <div className="flex justify-center items-center h-48 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-400 font-medium">No sub-categories found here.</p>
          </div>
          
        ) : (
          
          /* Modern Sub-Category Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-8">
            {subCategories.map((sub, index) => {
              const subName = sub?.name || sub?.subCategoryName || "Sub Category";
              const subImg = sub?.image || sub?.imageUrl;

              return (
                <div 
                  key={sub?._id || index}
                  onClick={() => {
                    // Yahan hum aage ka route denge jahan product dikhenge
                    console.log("Sub-category clicked:", sub?._id);
                    // navigate(`/products/${sub?._id}`); 
                  }}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center p-4 md:p-6"
                >
                  {/* Circular Image Container with Hover Effect */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-50 transition-colors duration-300 p-2 md:p-3">
                    {subImg ? (
                      <img 
                        src={subImg} 
                        alt={subName} 
                        className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/150x150?text=No+Image";
                        }}
                      />
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">No Image</span>
                    )}
                  </div>
                  
                  {/* Sub-Category Title */}
                  <h3 className="text-sm md:text-base font-bold text-gray-800 text-center leading-tight group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {subName}
                  </h3>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserCategory;