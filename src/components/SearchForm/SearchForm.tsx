import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase } from 'lucide-react';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    keyword: '',
    location: '',
    category: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchData.keyword) params.append('keyword', searchData.keyword);
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.category) params.append('category', searchData.category);
    
    navigate(`/jobs?${params.toString()}`);
  };

  const categories = [
    "Все категории",
    "IT и разработка",
    "Маркетинг",
    "Продажи",
    "Дизайн",
    "Финансы",
    "Образование",
    "Медицина",
    "Административный персонал",
    "Транспорт и логистика",
    "Производство",
    "Строительство",
    "Управление персоналом"
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          name="keyword"
          value={searchData.keyword}
          onChange={handleChange}
          placeholder="Должность, ключевые слова или компания"
          className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
        />
      </div>
      
      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          name="location"
          value={searchData.location}
          onChange={handleChange}
          placeholder="Город или регион"
          className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
        />
      </div>
      
      <div className="flex-1 relative">
        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
        <select
          name="category"
          value={searchData.category}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 appearance-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category === "Все категории" ? "" : category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Найти вакансии
      </button>
    </form>
  );
};

export default SearchForm;