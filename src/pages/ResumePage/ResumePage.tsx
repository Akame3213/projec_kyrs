import React, { useState } from 'react';

const ResumePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      birthDate: '',
      about: ''
    },
    experience: [{
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    education: [{
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: ['']
  });

  // Обработчики для формы
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value
      }
    }));
  };

  const handleExperienceChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === id) {
          if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            return { ...exp, [name]: target.checked };
          }
          return { ...exp, [name]: value };
        }
        return exp;
      })
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  };

  const removeExperience = (id: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleEducationChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu => {
        if (edu.id === id) {
          return { ...edu, [name]: value };
        }
        return edu;
      })
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const removeEducation = (id: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы код для сохранения резюме
    console.log('Form submitted:', formData);
    alert('Резюме успешно сохранено!');
  };

  // Навигация по секциям формы
  const sections = [
    { id: 'personal', title: 'Личная информация' },
    { id: 'experience', title: 'Опыт работы' },
    { id: 'education', title: 'Образование' },
    { id: 'skills', title: 'Навыки' },
    { id: 'preview', title: 'Предпросмотр' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h1 className="text-2xl font-bold">Создание резюме</h1>
          <p className="opacity-90">Заполните информацию о себе для создания профессионального резюме</p>
        </div>

        <div className="p-6">
          {/* Навигация по шагам */}
          <div className="mb-8">
            <div className="flex flex-wrap border-b">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`px-4 py-2 font-medium ${
                    activeSection === section.id 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Личная информация */}
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Личная информация</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.personal.firstName}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Иван"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.personal.lastName}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Иванов"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.personal.email}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ivan@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.personal.phone}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                      Город
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.personal.city}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Москва"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthDate" className="block text-gray-700 font-medium mb-2">
                      Дата рождения
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.personal.birthDate}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="about" className="block text-gray-700 font-medium mb-2">
                    О себе
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.personal.about}
                    onChange={handlePersonalChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Расскажите о себе, своих профессиональных целях и достижениях"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => setActiveSection('experience')}
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {/* Опыт работы */}
            {activeSection === 'experience' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Опыт работы</h2>
                
                {formData.experience.map((exp, index) => (
                  <div key={exp.id} className="mb-8 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Место работы #{index + 1}</h3>
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Компания
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Название компании"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Должность
                        </label>
                        <input
                          type="text"
                          name="position"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ваша должность"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Дата начала
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(exp.id, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Дата окончания
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(exp.id, e)}
                          disabled={exp.current}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            exp.current ? 'bg-gray-100' : ''
                          }`}
                        />
                        <div className="mt-2 flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            name="current"
                            checked={exp.current}
                            onChange={(e) => handleExperienceChange(exp.id, e)}
                            className="mr-2 h-4 w-4"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                            Я работаю здесь в настоящее время
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Описание обязанностей
                      </label>
                      <textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Опишите ваши обязанности и достижения на этой должности"
                      ></textarea>
                    </div>
                  </div>
                ))}
                
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Добавить опыт работы
                  </button>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveSection('personal')}
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => setActiveSection('education')}
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {/* Образование */}
            {activeSection === 'education' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Образование</h2>
                
                {formData.education.map((edu, index) => (
                  <div key={edu.id} className="mb-8 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Образование #{index + 1}</h3>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Учебное заведение
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(edu.id, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Название университета/колледжа"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Степень
                        </label>
                        <select
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Выберите степень</option>
                          <option value="Среднее образование">Среднее образование</option>
                          <option value="Среднее профессиональное">Среднее профессиональное</option>
                          <option value="Бакалавр">Бакалавр</option>
                          <option value="Магистр">Магистр</option>
                          <option value="Специалист">Специалист</option>
                          <option value="Кандидат наук">Кандидат наук</option>
                          <option value="Доктор наук">Доктор наук</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Специальность
                        </label>
                        <input
                          type="text"
                          name="field"
                          value={edu.field}
                          onChange={(e) => handleEducationChange(edu.id, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Название специальности"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Дата начала
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(edu.id, e)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Дата окончания
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(edu.id, e)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Дополнительная информация
                      </label>
                      <textarea
                        name="description"
                        value={edu.description}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Дополнительная информация об образовании, достижениях и т.д."
                      ></textarea>
                    </div>
                  </div>
                ))}
                
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={addEducation}
                    className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Добавить образование
                  </button>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveSection('experience')}
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => setActiveSection('skills')}
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {/* Навыки */}
            {activeSection === 'skills' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Навыки</h2>
                
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Добавьте ваши профессиональные навыки, которые важны для желаемой должности.
                  </p>
                  
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Например: JavaScript, Управление проектами, Adobe Photoshop"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addSkill}
                    className="text-blue-600 font-medium hover:text-blue-800 flex items-center mt-3"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Добавить навык
                  </button>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveSection('education')}
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => setActiveSection('preview')}
                  >
                    Предпросмотр
                  </button>
                </div>
              </div>
            )}

            {/* Предпросмотр */}
            {activeSection === 'preview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Предпросмотр резюме</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  {/* Личная информация */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {formData.personal.firstName} {formData.personal.lastName}
                    </h3>
                    <div className="text-gray-600 mb-4 flex flex-wrap gap-3">
                      {formData.personal.email && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24\" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth="2\" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span>{formData.personal.email}</span>
                        </div>
                      )}
                      {formData.personal.phone && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          <span>{formData.personal.phone}</span>
                        </div>
                      )}
                      {formData.personal.city && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span>{formData.personal.city}</span>
                        </div>
                      )}
                    </div>
                    {formData.personal.about && (
                      <p className="text-gray-700">{formData.personal.about}</p>
                    )}
                  </div>
                  
                  {/* Опыт работы */}
                  {formData.experience.some(exp => exp.company || exp.position) && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Опыт работы</h3>
                      {formData.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between">
                            <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                            <span className="text-gray-600 text-sm">
                              {exp.startDate && new Date(exp.startDate).toLocaleDateString('ru-RU', {year: 'numeric', month: 'long'})}
                              {' — '}
                              {exp.current ? 'По настоящее время' : 
                                exp.endDate && new Date(exp.endDate).toLocaleDateString('ru-RU', {year: 'numeric', month: 'long'})}
                            </span>
                          </div>
                          <p className="text-blue-600">{exp.company}</p>
                          {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Образование */}
                  {formData.education.some(edu => edu.institution || edu.degree) && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Образование</h3>
                      {formData.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between">
                            <h4 className="font-semibold text-gray-800">{edu.degree} {edu.field && `(${edu.field})`}</h4>
                            <span className="text-gray-600 text-sm">
                              {edu.startDate && new Date(edu.startDate).toLocaleDateString('ru-RU', {year: 'numeric'})}
                              {' — '}
                              {edu.endDate && new Date(edu.endDate).toLocaleDateString('ru-RU', {year: 'numeric'})}
                            </span>
                          </div>
                          <p className="text-blue-600">{edu.institution}</p>
                          {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Навыки */}
                  {formData.skills.some(skill => skill.trim() !== '') && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Навыки</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveSection('skills')}
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Сохранить резюме
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;