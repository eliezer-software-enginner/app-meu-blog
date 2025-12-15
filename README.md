🧪 EXERCÍCIO DESAFIADOR DO MÓDULO 2

Este exercício simula um cenário real de empresa financeira.

Crie uma aplicação Next.js com a rota:

dashboard/
Regras (obrigatórias):

SSR com 3 tipos de cache juntos:

no-store para dados sensíveis

revalidate: X para métricas

force-cache para conteúdo estável

Buscar estes endpoints (pode ser com API fake tipo dummyjson, mas deve respeitar regras abaixo):

🔹 Dados sensíveis (no-store)
https://dummyjson.com/carts/1

🔹 Dados de métricas (revalidate)
https://dummyjson.com/products?limit=5

🔹 Dados estáveis (cache padrão)
https://dummyjson.com/users

Renderizar tudo em server component.

Exibir cada grupo dentro de um componente de UI pronto (Card, Table, Badge etc).

Criar um header persistente com CSS module.

Usar Promise.all para otimizar.
