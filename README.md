# Veloz — assistência veicular sob demanda

MVP navegável do marketplace que conecta motoristas em emergência a prestadores próximos. A experiência foi desenhada para demonstrar o valor do produto em três minutos: o motorista escolhe o problema, informa onde está, vê preço fixo e ETA antes de confirmar e acompanha o chamado.

## Executar localmente

O projeto é uma aplicação web estática, sem dependências de build:

```bash
python3 -m http.server 4173
```

Abra `http://localhost:4173` no navegador.

## O que está demonstrado

- Fluxo de pedido em três etapas para guincho, pneu, bateria e pane seca.
- Estimativa transparente de preço, distância, prestadores online e tempo de chegada.
- Localização atual editável, destino opcional, formas de pagamento e confirmação do chamado.
- Modal de acompanhamento após o pedido, navegação por histórico e conta.
- Painel de indicadores de negócio (chamados, GMV, conclusão e renda de prestadores) e impacto (motoristas ajudados, tempo economizado e avaliação).
- Layout responsivo para desktop e celular, com navegação por hash e sem necessidade de backend para a demonstração.

Os dados exibidos são de demonstração e o pagamento/mapa estão simulados para validar a proposta de valor antes das integrações de produção.