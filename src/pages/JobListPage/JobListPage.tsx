import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';
import JobCard from '../../components/JobCard/JobCard';
import { jobsData, Job } from '../../data/jobs';
import { Filter, Briefcase } from 'lucide-react';

const JobListPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [filters, setFilters] = useState({
    type: queryParams.get('type') || '',
    salary: '',
    experience: '',
    remote: queryParams.get('remote') === 'true',
  });

  // Загрузка начальных данных о вакансиях
  useEffect(() => {
    setJobs(jobsData);
  }, []);

  // Функция для извлечения числового значения зарплаты
  const getSalaryValue = (salary: string): number => {
    const matches = salary.match(/\d+/g);
    if (!matches) return 0;
    // Берем среднее значение между минимальной и максимальной зарплатой
    if (matches.length > 1) {
      return (parseInt(matches[0]) + parseInt(matches[1])) / 2;
    }
    return parseInt(matches[0]);
  };

  // Применение фильтров и сортировки
  useEffect(() => {
    const keyword = queryParams.get('keyword')?.toLowerCase() || '';
    const location = queryParams.get('location')?.toLowerCase() || '';
    const category = queryParams.get('category')?.toLowerCase() || '';
    
    let result = [...jobs];

    // Фильтрация по поисковому запросу
    if (keyword) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(keyword) || 
        job.description.toLowerCase().includes(keyword) || 
        job.company.toLowerCase().includes(keyword)
      );
    }

    // Фильтрация по местоположению
    if (location) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }

    // Фильтрация по категории
    if (category) {
      result = result.filter(job => 
        job.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Дополнительные фильтры
    if (filters.type) {
      result = result.filter(job => job.type === filters.type);
    }

    if (filters.salary) {
      const minSalary = parseInt(filters.salary);
      result = result.filter(job => getSalaryValue(job.salary) >= minSalary);
    }

    if (filters.remote) {
      result = result.filter(job => job.isRemote);
    }

    // Сортировка
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'salary_desc':
          return getSalaryValue(b.salary) - getSalaryValue(a.salary);
        case 'salary_asc':
          return getSalaryValue(a.salary) - getSalaryValue(b.salary);
        case 'newest':
        default:
          // Для демонстрации используем id как временную метку
          return parseInt(b.id) - parseInt(a.id);
      }
    });

    setFilteredJobs(result);
  }, [jobs, queryParams, filters, sortOrder]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFilters(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Поиск вакансий</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <SearchForm />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Фильтры для мобильных устройств */}
        <div className="md:hidden mb-4">
          <button 
            onClick={toggleFilter} 
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            <Filter className="h-5 w-5" />
            <span>Фильтры</span>
          </button>
          
          {isFilterOpen && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              {/* Мобильные фильтры */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Тип занятости</label>
                <select 
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Все типы</option>
                  <option value="Полная занятость">Полная занятость</option>
                  <option value="Частичная занятость">Частичная занятость</option>
                  <option value="Проектная работа">Проектная работа</option>
                  <option value="Стажировка">Стажировка</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Удаленная работа</label>
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    name="remote"
                    checked={filters.remote}
                    onChange={handleFilterChange}
                    className="mr-2 h-4 w-4"
                  />
                  <span>Только удаленная работа</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель с фильтрами (десктоп) */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Тип занятости</label>
              <select 
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Все типы</option>
                <option value="Полная занятость">Полная занятость</option>
                <option value="Частичная занятость">Частичная занятость</option>
                <option value="Проектная работа">Проектная работа</option>
                <option value="Стажировка">Стажировка</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Заработная плата</label>
              <select 
                name="salary"
                value={filters.salary}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Любая</option>
                <option value="50000">от 50 000 ₽</option>
                <option value="100000">от 100 000 ₽</option>
                <option value="150000">от 150 000 ₽</option>
                <option value="200000">от 200 000 ₽</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Удаленная работа</label>
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  name="remote"
                  checked={filters.remote}
                  onChange={handleFilterChange}
                  className="mr-2 h-4 w-4"
                />
                <span>Только удаленная работа</span>
              </div>
            </div>
          </div>
        </div>

        {/* Список вакансий */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Найдено вакансий: {filteredJobs.length}
            </h2>
            <div>
              <select 
                className="p-2 border border-gray-300 rounded-md"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Сначала новые</option>
                <option value="salary_desc">По убыванию зарплаты</option>
                <option value="salary_asc">По возрастанию зарплаты</option>
              </select>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Вакансии не найдены</h3>
              <p className="text-gray-600 mb-4">
                К сожалению, по вашему запросу не найдено подходящих вакансий. Попробуйте изменить параметры поиска.
              </p>
              <button 
                onClick={() => {
                  setFilters({
                    type: '',
                    salary: '',
                    experience: '',
                    remote: false,
                  });
                  setSortOrder('newest');
                  window.history.pushState({}, '', '/jobs');
                }}
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListPage;