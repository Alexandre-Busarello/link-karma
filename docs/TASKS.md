1. Internacionalizar o projeto (todas as paginas, todos os prompts em backend, todo cadastros no supabase deve ser feito também por região). Nos filtros da vitrine pode ter uma opção de mostrar todas as regiões (independente da lingua escolhida na plataforma);
2. Ao criar conta, logar ou acessar qualquer area diferente da LandingPage devemos mostrar o OnBoarding (caso ainda não tenha visto);
3. Ao clicar em Minhas Vitrines o usuario deve visualizar as suas vitrines e não a lista de vitrines geral;
4. Explorar Vitrines deve levar para a lista de vitrines geral;
5. Boosts ativos devem ter espaço especial e aparecerem com mais frequencia (prioridade por Destacar Vitrine e em sequencia para Impulsionar Vitrine);
6. O mecanismo de registro de Prova de Contribuição, Karma Points e Trust Score deve ser robusto e aprovas de falhas orientado a eventos, ou seja, só são registrados no "livro razão" quando um evento é concluído com sucesso. Quando um evento é concluido com sucesso precisamos garantir a atribuição de cada um dos pontos através de um fila com retentativa (QStash).

   **Exemplo de eventos:**

- Verificação aprovada por IA
- Verificação aprovada por Divulgador
- Verificação aprovada por Comunidade
- Voto na Comunidade
- Impulsionar Vitrine
- Destacar Vitrine
- Assinatura Mensal
- Assinatura Anual
- Assinatura de Fundador
- Assinatura de Membro
- Assinatura de Colaborador
