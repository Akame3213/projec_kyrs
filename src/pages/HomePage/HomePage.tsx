import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, Building } from 'lucide-react';
import SearchForm from '../../components/SearchForm/SearchForm';
import FeaturedJobs from '../../components/FeaturedJobs/FeaturedJobs';

const HomePage: React.FC = () => {
  const stats = [
    { icon: <Briefcase className="h-8 w-8 text-blue-500" />, value: "10,000+", label: "Вакансий" },
    { icon: <Users className="h-8 w-8 text-green-500" />, value: "50,000+", label: "Соискателей" },
    { icon: <Building className="h-8 w-8 text-purple-500" />, value: "5,000+", label: "Компаний" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Найдите работу своей мечты
            </h1>
            <p className="text-xl opacity-90">
              Тысячи вакансий от ведущих компаний России ждут вас
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Популярные вакансии</h2>
            <p className="text-gray-600">Подборка актуальных предложений от ведущих работодателей</p>
          </div>
          
          <FeaturedJobs />
          
          <div className="text-center mt-8">
            <Link 
              to="/jobs" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Смотреть все вакансии
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Категории вакансий</h2>
            <p className="text-gray-600">Найдите работу в интересующей вас сфере</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "IT и разработка", "Маркетинг", "Продажи", "Дизайн", 
              "Финансы", "Образование", "Медицина", "Административный персонал",
              "Транспорт и логистика", "Производство", "Строительство", "Управление персоналом"
            ].map((category, index) => (
              <Link 
                key={index} 
                to={`/jobs?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-blue-50 transition-colors"
              >
                <span className="text-gray-800 font-medium">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы найти работу мечты?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Создайте аккаунт, загрузите резюме и начните поиск прямо сейчас
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Зарегистрироваться
            </Link>
            <Link 
              to="/jobs" 
              className="bg-transparent text-white border border-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Начать поиск
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;