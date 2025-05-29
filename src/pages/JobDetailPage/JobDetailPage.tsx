import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Building, Heart, Calendar, Globe, Share2 } from 'lucide-react';
import { jobsData, Job } from '../../data/jobs';
import { useAuth } from '../../context/AuthContext';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Имитация загрузки данных с сервера
    setIsLoading(true);
    try {
      const foundJob = jobsData.find(job => job.id === id);
      if (foundJob) {
        setJob(foundJob);
        setError(null);
      } else {
        setError('Вакансия не найдена');
      }
    } catch (err) {
      setError('Произошла ошибка при загрузке данных');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-800">
            Вернуться к списку вакансий
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/jobs" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к вакансиям
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Заголовок вакансии */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{job.title}</h1>
                <p className="text-lg text-gray-600">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5 mr-1" />
                <span>Сохранить</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                <Share2 className="h-5 w-5 mr-1" />
                <span>Поделиться</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Детали вакансии */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Building className="h-5 w-5 mr-2 text-blue-500" />
              <span>{job.category}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              <span>Размещено: {job.posted}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              <span>Срок: до {job.deadline}</span>
            </div>
            {job.isRemote && (
              <div className="flex items-center text-gray-600">
                <Globe className="h-5 w-5 mr-2 text-blue-500" />
                <span>Удаленная работа</span>
              </div>
            )}
          </div>

          {/* Зарплата и кнопка отклика */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-8">
            <div>
              <p className="text-gray-600 mb-1">Заработная плата</p>
              <p className="text-2xl font-semibold text-gray-800">{job.salary}</p>
            </div>
            {isAuthenticated ? (
              <button className="w-full md:w-auto mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Откликнуться на вакансию
              </button>
            ) : (
              <div className="w-full md:w-auto mt-4 md:mt-0 text-center">
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors inline-block">
                  Войдите, чтобы откликнуться
                </Link>
              </div>
            )}
          </div>

          {/* Описание вакансии */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Описание вакансии</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
          </div>

          {/* Обязанности */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Обязанности</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Требования */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Требования</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.requirements.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Преимущества */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Мы предлагаем</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.benefits.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Кнопка отклика (внизу) */}
          <div className="text-center mt-8">
            {isAuthenticated ? (
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Откликнуться на вакансию
              </button>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors inline-block">
                Войдите, чтобы откликнуться
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;