'use client';

import {
  ArrowRight,
  Check,
  Coins,
  Crown,
  Gift,
  Image,
  Shield,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { useIntl } from '@linkkarma/intl';

export function Pricing() {
  const { t } = useIntl();
  const plans = [
    {
      name: t('frontend.pricing.plans.basic.name'),
      price: t('frontend.pricing.plans.basic.price'),
      period: t('frontend.pricing.plans.basic.period'),
      description: t('frontend.pricing.plans.basic.description'),
      popular: false,
      features: [
        {
          icon: Sparkles,
          text: t('frontend.pricing.plans.basic.features.activeShowcases'),
          highlight: false,
        },
        {
          icon: Shield,
          text: t('frontend.pricing.plans.basic.features.aiVerifications'),
          highlight: false,
        },
        {
          icon: Image,
          text: t('frontend.pricing.plans.basic.features.coverImage'),
          highlight: false,
        },
        {
          icon: Users,
          text: t(
            'frontend.pricing.plans.basic.features.communityVerification'
          ),
          highlight: false,
        },
        {
          icon: Coins,
          text: t('frontend.pricing.plans.basic.features.karmaPointsPurchase'),
          highlight: false,
        },
        {
          icon: Gift,
          text: t('frontend.pricing.plans.basic.features.freeShowcaseBonus'),
          highlight: true,
        },
      ],
      limitations: [
        t('frontend.pricing.plans.basic.limitations.0'),
        t('frontend.pricing.plans.basic.limitations.1'),
        t('frontend.pricing.plans.basic.limitations.2'),
      ],
      cta: t('frontend.pricing.plans.basic.cta'),
      ctaLink: '/auth/signup',
    },
    {
      name: t('frontend.pricing.plans.pro.name'),
      price: t('frontend.pricing.plans.pro.price'),
      period: t('frontend.pricing.plans.pro.period'),
      description: t('frontend.pricing.plans.pro.description'),
      popular: true,
      features: [
        {
          icon: Crown,
          text: t('frontend.pricing.plans.pro.features.activeShowcases'),
          highlight: true,
        },
        {
          icon: Zap,
          text: t('frontend.pricing.plans.pro.features.aiVerifications'),
          highlight: true,
        },
        {
          icon: Coins,
          text: t('frontend.pricing.plans.pro.features.monthlyKarmaPoints'),
          highlight: true,
        },
        {
          icon: Image,
          text: t('frontend.pricing.plans.pro.features.imageGallery'),
          highlight: true,
        },
        {
          icon: Video,
          text: t('frontend.pricing.plans.pro.features.videoEmbed'),
          highlight: true,
        },
        {
          icon: Star,
          text: t('frontend.pricing.plans.pro.features.karmaPointsDiscount'),
          highlight: true,
        },
      ],
      benefits: [
        t('frontend.pricing.plans.pro.benefits.0'),
        t('frontend.pricing.plans.pro.benefits.1'),
        t('frontend.pricing.plans.pro.benefits.2'),
        t('frontend.pricing.plans.pro.benefits.3'),
      ],
      cta: t('frontend.pricing.plans.pro.cta'),
      ctaLink: '/auth/signup?plan=pro',
    },
  ];

  return (
    <section
      id="pricing"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 rounded-full text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            {t('frontend.pricing.badge')}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0"
            dangerouslySetInnerHTML={{
              __html: t('frontend.pricing.title'),
            }}
          ></h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            {t('frontend.pricing.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                plan.popular
                  ? 'border-blue-500 ring-4 ring-blue-100'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4 inline mr-1" />
                    {t('frontend.pricing.plans.pro.popularBadge')}
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 ml-1 text-lg">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    {t('frontend.pricing.featuresIncluded')}
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            feature.highlight
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          <feature.icon className="w-3 h-3" />
                        </div>
                        <span
                          className={`text-sm ${
                            feature.highlight
                              ? 'font-semibold text-gray-900'
                              : 'text-gray-700'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits/Limitations */}
                {(plan.benefits || plan.limitations) && (
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      {plan.benefits
                        ? t('frontend.pricing.extraBenefits')
                        : t('frontend.pricing.limitations')}
                    </h4>
                    <ul className="space-y-2">
                      {(plan.benefits || plan.limitations)?.map(
                        (item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                          >
                            <Check
                              className={`flex-shrink-0 w-4 h-4 mt-0.5 ${
                                plan.benefits
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <span className="text-sm text-gray-600">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={plan.ctaLink}
                  className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Karma Points Explanation */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-yellow-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('frontend.pricing.karmaPointsExplanation.title')}
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                {t('frontend.pricing.karmaPointsExplanation.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t(
                    'frontend.pricing.karmaPointsExplanation.uses.boostShowcase.title'
                  )}
                </h4>
                <p className="text-sm text-gray-600">
                  {t(
                    'frontend.pricing.karmaPointsExplanation.uses.boostShowcase.description'
                  )}
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t(
                    'frontend.pricing.karmaPointsExplanation.uses.featureShowcase.title'
                  )}
                </h4>
                <p className="text-sm text-gray-600">
                  {t(
                    'frontend.pricing.karmaPointsExplanation.uses.featureShowcase.description'
                  )}
                </p>
              </div>

              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t(
                    'frontend.pricing.karmaPointsExplanation.uses.proSalary.title'
                  )}
                </h4>
                <p className="text-sm text-gray-600">
                  {t(
                    'frontend.pricing.karmaPointsExplanation.uses.proSalary.description'
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: t('frontend.pricing.karmaPointsExplanation.proNote'),
                }}
              ></p>
            </div>
          </div>
        </div>

        {/* FAQ Pricing */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('frontend.pricing.faq.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('frontend.pricing.faq.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="#faq"
                className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                {t('frontend.pricing.faq.viewFullFaq')}
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('frontend.pricing.faq.startNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
