'use client';

import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Code,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const experiences = [
    {
      company: 'Descomplica',
      role: 'Gerente Técnico Pleno',
      period: 'Mar 2024 - Atual',
      location: 'Blumenau, SC - Remoto',
      description:
        'Gerente técnico liderando os times de UEE (Vestibulares) e SRE (Site Reliability Engineering), com foco em modernização de infraestrutura, otimização de custos na AWS e fortalecimento da cultura DevOps.',
      achievements: [
        'Continuidade no UEE: Gerencio a plataforma utilizada por mais de 70k alunos',
        'Liderança no SRE: Conduzi a remodelação da infraestrutura legada',
        'Redução de Custos: Implementei estratégias que reduziram em 20% os custos na AWS',
        'Cultura DevOps: Promovi a adoção de práticas modernas, incluindo automação CI/CD',
        'Mentoria e Colaboração: Atuo como mentor técnico e colaboro com stakeholders',
      ],
      skills: [
        'AWS',
        'Kubernetes',
        'DevOps',
        'Liderança',
        'Terraform',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      company: 'Descomplica',
      role: 'Líder Técnico',
      period: 'Out 2023 - Mar 2024',
      location: 'Remoto',
      description:
        'Líder técnico da área de engenharia de software, responsável pelo time de UEE (Plataforma de Vestibulares) e pela gestão diária de uma plataforma utilizada por mais de 70k alunos.',
      achievements: [
        'Conduzi a transição de uma plataforma legada para uma nova plataforma moderna',
        'Implementei uma arquitetura moderna, desacoplada e escalável em EKS na AWS',
        'Planejei e executei a migração garantindo alta disponibilidade e segurança',
        'Implantei melhorias no monitoramento com Grafana, Kibana, ElasticSearch e Prometheus',
        'Liderei a adoção de práticas ágeis no time de engenharia',
      ],
      skills: [
        'EKS',
        'Microserviços',
        'Kubernetes',
        'Helm',
        'Monitoring',
        'Arquitetura',
      ],
    },
    {
      company: 'Descomplica',
      role: 'Engenheiro de Aplicações Sênior',
      period: 'Set 2019 - Out 2023',
      location: 'Rio de Janeiro, RJ',
      description:
        'Responsável pelo desenvolvimento técnico do produto de Enem/Vestibulares. Envolvido em tomada de decisões do produto e apoiando o time na parte técnica.',
      achievements: [
        'Modelagem do domínio utilizando os conceitos de DDD',
        'Criação de micro-serviços para atender os domínios modelados',
        'Desenvolvimento com Node.js/PostgreSQL com arquitetura própria',
        'Desenvolvimento de frontend com React utilizando microfrontends',
        'Responsável pela qualidade geral do código fazendo reviews',
      ],
      skills: [
        'Node.js',
        'React',
        'PostgreSQL',
        'DDD',
        'Microserviços',
        'Jest',
        'Terraform',
      ],
    },
    {
      company: 'IBM',
      role: 'Desenvolvedor de Aplicações',
      period: 'Dez 2017 - Ago 2019',
      location: 'Rio de Janeiro, RJ',
      description:
        'Desenvolvimento de soluções corporativas utilizando tecnologias Microsoft e frameworks modernos.',
      achievements: [
        'Desenvolvimento de APIs REST em .NET',
        'Desenvolvimento e manutenção de aplicações AngularJS',
        'Desenvolvimento com IONIC para aplicações móveis',
      ],
      skills: ['.NET', 'AngularJS', 'IONIC', 'REST APIs'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/pt"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o LinkKarma
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white/30">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Desenvolvedor & Fundador do LinkKarma
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
              Gerente Técnico na Descomplica com 10+ anos de experiência em
              engenharia de software, liderança técnica e arquitetura de
              sistemas escaláveis.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <MapPin className="w-5 h-5" />
              <span>Blumenau, Santa Catarina - Brasil</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Experiência Profissional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma jornada de crescimento contínuo, desde desenvolvedor até
              liderança técnica, sempre focado em entregar soluções de alto
              impacto.
            </p>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
                )}

                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {exp.role}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{exp.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Principais Conquistas:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Tecnologias:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Formação Acadêmica
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ciência da Computação
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  FURB - Universidade de Blumenau
                </p>
                <p className="text-gray-600 mb-4">2008 - 2014</p>
                <p className="text-gray-700">
                  Formação sólida em desenvolvimento de software, engenharia de
                  software, redes de computadores e linguagens de programação.
                  Curso concluído no 2º semestre de 2013.
                </p>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Code className="w-6 h-6 text-blue-600" />
                Especialidades Técnicas
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Backend & Cloud
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Node.js',
                      'TypeScript',
                      'PostgreSQL',
                      'AWS',
                      'Kubernetes',
                      'Docker',
                      'Terraform',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Frontend & Mobile
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React',
                      'Next.js',
                      'TypeScript',
                      'Tailwind CSS',
                      'Angular',
                      'IONIC',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    DevOps & Monitoring
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'CI/CD',
                      'Prometheus',
                      'Grafana',
                      'ElasticSearch',
                      'Kibana',
                      'Helm',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Liderança & Gestão
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Liderança Técnica',
                      'Mentoria',
                      'Arquitetura',
                      'DDD',
                      'Microserviços',
                      'Agile',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkKarma Vision */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            A Visão por Trás do LinkKarma
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              "Após anos liderando equipes e construindo plataformas que servem
              dezenas de milhares de usuários, decidi aplicar toda essa
              experiência em um projeto pessoal. LinkKarma representa a
              convergência de tudo que aprendi sobre arquitetura escalável,
              experiência do usuário e construção de comunidades digitais
              sustentáveis."
            </blockquote>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Experiência
                </h3>
                <p className="text-gray-600 text-sm">
                  10+ anos construindo sistemas escaláveis
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Impacto</h3>
                <p className="text-gray-600 text-sm">
                  70k+ usuários impactados diretamente
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Inovação</h3>
                <p className="text-gray-600 text-sm">
                  Sempre buscando soluções disruptivas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Vamos Conversar
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Interessado em conhecer mais sobre o projeto ou trocar ideias sobre
            tecnologia?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://linkedin.com/in/seu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
            <Link
              href="/pt"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Voltar ao LinkKarma
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
