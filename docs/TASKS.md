1. Ao criar conta, logar ou acessar qualquer area diferente da LandingPage devemos mostrar o OnBoarding (caso ainda não tenha visto);
2. Ao clicar em Minhas Vitrines o usuario deve visualizar as suas vitrines e não a lista de vitrines geral;
3. Explorar Vitrines deve levar para a lista de vitrines geral;
4. Boosts ativos devem ter espaço especial e aparecerem com mais frequencia (prioridade por Destacar Vitrine e em sequencia para Impulsionar Vitrine);
5. O mecanismo de registro de Prova de Contribuição, Karma Points e Trust Score deve ser robusto e aprovas de falha orientado a eventos, ou seja, só são registrados no "livro razão" quando um evento é concluído com sucesso. Quando um evento é concluido com sucesso precisamos garantir a atribuição de cada um dos pontos através de um fila com retentativa (QStash).

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
