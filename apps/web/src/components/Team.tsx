'use client';

import { useIntl } from '@linkkarma/intl';
import {
  Award,
  Building2,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export function Team() {
  const { t } = useIntl();

  const skillsItems = t('frontend.team.skills.items');

  return (
    <section id="team" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 rounded-full text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            {t('frontend.team.badge')}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0"
            dangerouslySetInnerHTML={{
              __html: t('frontend.team.title'),
            }}
          ></h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            {t('frontend.team.description')}
          </p>
        </div>

        {/* Founder Profile */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-12">
              <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Code className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center lg:text-left text-white flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                    {t('frontend.team.founder.title')}
                  </h3>
                  <p className="text-blue-100 text-lg sm:text-xl mb-4">
                    {t('frontend.team.founder.position')}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {t('frontend.team.founder.experience')}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {t('frontend.team.founder.usersManaged')}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {t('frontend.team.founder.awsSpecialist')}
                    </span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-100">
                    <MapPin className="w-4 h-4" />
                    <span>{t('frontend.team.founder.location')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Experience Summary */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {t('frontend.team.experience.title')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {t(
                            'frontend.team.experience.positions.technicalManager.title'
                          )}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          {t(
                            'frontend.team.experience.positions.technicalManager.company'
                          )}
                        </p>
                        <p className="text-gray-700 text-sm mt-1">
                          {t(
                            'frontend.team.experience.positions.technicalManager.description'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {t(
                            'frontend.team.experience.positions.technicalLead.title'
                          )}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          {t(
                            'frontend.team.experience.positions.technicalLead.company'
                          )}
                        </p>
                        <p className="text-gray-700 text-sm mt-1">
                          {t(
                            'frontend.team.experience.positions.technicalLead.description'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Code className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {t(
                            'frontend.team.experience.positions.seniorEngineer.title'
                          )}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          {t(
                            'frontend.team.experience.positions.seniorEngineer.company'
                          )}
                        </p>
                        <p className="text-gray-700 text-sm mt-1">
                          {t(
                            'frontend.team.experience.positions.seniorEngineer.description'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {t(
                            'frontend.team.experience.positions.developer.title'
                          )}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          {t(
                            'frontend.team.experience.positions.developer.company'
                          )}
                        </p>
                        <p className="text-gray-700 text-sm mt-1">
                          {t(
                            'frontend.team.experience.positions.developer.description'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Skills */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {t('frontend.team.skills.title')}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.isArray(skillsItems) ? (
                    skillsItems.map((skill: string, index: number) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-gray-100 rounded-lg text-center"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {skill}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-red-500">
                      Error: Skills items is not an array. Type:{' '}
                      {typeof skillsItems}
                    </div>
                  )}
                </div>
              </div>

              {/* Education & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    {t('frontend.team.education.title')}
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t('frontend.team.education.degree')}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {t('frontend.team.education.university')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    {t('frontend.team.achievements.title')}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• {t('frontend.team.achievements.items.0')}</p>
                    <p>• {t('frontend.team.achievements.items.1')}</p>
                    <p>• {t('frontend.team.achievements.items.2')}</p>
                    <p>• {t('frontend.team.achievements.items.3')}</p>
                  </div>
                </div>
              </div>

              {/* Vision for LinkKarma */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {t('frontend.team.vision.title')}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('frontend.team.vision.description')}
                </p>
              </div>

              {/* Contact Links */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm w-full sm:w-auto justify-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('frontend.team.contact.viewFullResume')}
                </Link>
                <a
                  href="https://linkedin.com/in/seu-perfil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm w-full sm:w-auto justify-center"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  {t('frontend.team.contact.linkedin')}
                </a>
                <a
                  href="https://github.com/seu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm w-full sm:w-auto justify-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t('frontend.team.contact.github')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {t('frontend.team.stats.experience.value')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('frontend.team.stats.experience.label')}
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {t('frontend.team.stats.users.value')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('frontend.team.stats.users.label')}
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {t('frontend.team.stats.costReduction.value')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('frontend.team.stats.costReduction.label')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
