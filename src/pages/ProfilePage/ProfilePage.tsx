import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, Phone, Mail, MapPin, Calendar, Briefcase } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'settings'>('profile');
  
  // Демо-данные для профиля
  const profile = {
    name: user?.name || "Иван Иванов",
    email: user?.email || "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    location: "Москва",
    birthDate: "01.01.1990",
    about: "Опытный frontend-разработчик с 5-летним стажем работы. Специализируюсь на создании современных веб-приложений с использованием React, TypeScript и других современных технологий.",
    skills: ["JavaScript", "TypeScript", "React", "Redux", "HTML5", "CSS3", "Tailwind CSS"],
    experience: [
      {
        id: 1,
        company: "ТехноСофт",
        position: "Frontend-разработчик",
        period: "2020 - настоящее время",
        description: "Разработка пользовательских интерфейсов для корпоративных приложений. Создание и поддержка компонентной библиотеки."
      },
      {
        id: 2,
        company: "ДиджиталПро",
        position: "Junior Frontend-разработчик",
        period: "2018 - 2020",
        description: "Верстка и интеграция веб-интерфейсов с бэкендом. Участие в разработке новых функциональных возможностей."
      }
    ],
    education: [
      {
        id: 1,
        institution: "Московский Технический Университет",
        degree: "Магистр информационных технологий",
        period: "2016 - 2018"
      },
      {
        id: 2,
        institution: "Московский Технический Университет",
        degree: "Бакалавр компьютерных наук",
        period: "2012 - 2016"
      }
    ]
  };

  // Демо-данные для откликов на вакансии
  const applications = [
    {
      id: 1,
      position: "Frontend-разработчик (React)",
      company: "ТехноСофт",
      date: "20.05.2025",
      status: "Рассматривается",
      statusColor: "yellow"
    },
    {
      id: 2,
      position: "Senior Frontend Developer",
      company: "ДиджиталПро",
      date: "15.05.2025",
      status: "Приглашение на собеседование",
      statusColor: "green"
    },
    {
      id: 3,
      position: "React Developer",
      company: "АртДизайн",
      date: "10.05.2025",
      status: "Отклонено",
      statusColor: "red"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Заголовок профиля */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h1 className="text-2xl font-bold">Личный кабинет</h1>
          <p className="opacity-90">Управляйте своим профилем и откликами на вакансии</p>
        </div>

        {/* Навигация по разделам */}
        <div className="bg-white border-b">
          <div className="flex">
            <button 
              className={`px-6 py-4 font-medium ${
                activeTab === 'profile' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>Мой профиль</span>
              </div>
            </button>
            <button 
              className={`px-6 py-4 font-medium ${
                activeTab === 'applications' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('applications')}
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>Мои отклики</span>
              </div>
            </button>
            <button 
              className={`px-6 py-4 font-medium ${
                activeTab === 'settings' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                <span>Настройки</span>
              </div>
            </button>
          </div>
        </div>

        {/* Содержимое вкладок */}
        <div className="p-6">
          {/* Профиль */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex flex-col md:flex-row">
                {/* Левая колонка с основной информацией */}
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-16 w-16 text-blue-500" />
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-center mb-4">{profile.name}</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{profile.birthDate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Редактировать профиль
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Правая колонка с подробной информацией */}
                <div className="md:w-2/3">
                  {/* О себе */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Обо мне</h3>
                    <p className="text-gray-700 leading-relaxed">{profile.about}</p>
                  </div>
                  
                  {/* Навыки */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Навыки</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Опыт работы */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Опыт работы</h3>
                    <div className="space-y-4">
                      {profile.experience.map(exp => (
                        <div key={exp.id} className="border-l-2 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                          <p className="text-blue-600">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.period}</p>
                          <p className="text-gray-700 mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Образование */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Образование</h3>
                    <div className="space-y-4">
                      {profile.education.map(edu => (
                        <div key={edu.id} className="border-l-2 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                          <p className="text-blue-600">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Мои отклики */}
          {activeTab === 'applications' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Мои отклики на вакансии</h3>
              
              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Вакансия
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Компания
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата отклика
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Статус
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map(app => (
                        <tr key={app.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{app.position}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{app.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{app.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${app.statusColor === 'green' ? 'bg-green-100 text-green-800' : 
                                app.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-800">
                              Подробнее
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-800 mb-2">У вас пока нет откликов</h4>
                  <p className="text-gray-600 mb-4">Начните поиск работы и откликайтесь на интересующие вас вакансии</p>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Найти вакансии
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Настройки */}
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Настройки аккаунта</h3>
              
              <div className="max-w-2xl">
                {/* Изменение пароля */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Изменение пароля</h4>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                        Текущий пароль
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                        Новый пароль
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Подтвердите новый пароль
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Изменить пароль
                    </button>
                  </form>
                </div>
                
                {/* Настройки уведомлений */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Настройки уведомлений</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Электронная почта</p>
                        <p className="text-sm text-gray-600">Получать уведомления на email</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Статус откликов</p>
                        <p className="text-sm text-gray-600">Уведомления об изменении статуса откликов</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Новые вакансии</p>
                        <p className="text-sm text-gray-600">Уведомления о новых вакансиях по вашим критериям</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Удаление аккаунта */}
                <div>
                  <h4 className="text-lg font-medium text-red-600 mb-4">Удаление аккаунта</h4>
                  <p className="text-gray-600 mb-4">
                    При удалении аккаунта вся ваша информация будет безвозвратно удалена из нашей системы.
                  </p>
                  <button 
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Удалить аккаунт
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;