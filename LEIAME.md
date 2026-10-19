# Front Security — Coberturas

App separado do QTI Monitor (banco de dados próprio). Mesmos postos (QTHs) e mesmo layout.

## O que ele faz
- **QRAs por posto**: cadastrar, editar e excluir pela própria tela (aba 👥 QRAs ou "👤 + QRA" no card do posto).
- **Lista de QRAs**: busca por nome ou posto, mostrando o posto, o turno e o **próximo empenho** de cada um.
- **Alerta de folga**: lançar "fulano de folga no dia tal". O posto passa a alertar (piscar + som, igual ao QTI) até alguém ser escalado para cobrir.
- **QRA de cobertura**: escolher a vaga do dia (ex.: "🌙 Noturno par — titular: João") e quem cobre — da lista, um nome temporário, ou **"⏳ Ainda não sei"** para só criar o alerta (o posto pisca até você usar "👤 Definir QRA"). O app avisa se houver:
  - ⛔ **choque**: a pessoa já está empenhada no mesmo turno (como titular ou em outra cobertura);
  - ⚠️ **dobra**: empenho no turno anterior ou no posterior;
  - ⚠️ posto que não opera nesse turno.
- **Google Agenda**: botão 📅 em cada folga/cobertura abre o evento já preenchido.
- **Tempo real**: se um atualiza, todos veem (Firebase Realtime Database).

- **Tirar do posto**: o ✕ no nome do QRA (card do posto) ou "🚫 Tirar do posto" na lista. O QRA continua cadastrado como **reserva** e pode cobrir.
- **Fim de semana dos postos híbridos**: a partir de segunda-feira, todo turno de sábado/domingo sem ninguém (sem titular presente e sem cobertura) fica alertando (card piscando, seção no topo de "Folgas & Coberturas", som a cada 2 h) até ser preenchido.

## Turnos e vagas
- ☀️ **Diurno**: 07h–19h · 🌙 **Noturno**: 19h–07h (o noturno pertence ao dia em que começa).
- **Híbridos**: noturno de seg a sex entra às **17h** (sai 07h); sábado e domingo 19h–07h.
- **Alertas**: começam às **05:00** (diurno) e **17:00** (noturno) e duram até o fim do turno.
Cada posto tem uma **tabela de vagas** e cada vaga aceita **um QRA só** (para trocar, tire o atual com ✕):
- **24h**: Diurno par · Diurno ímpar · Noturno par · Noturno ímpar
- **Noturno**: Noturno par · Noturno ímpar
- **Híbrido**: Diurno seg–sex (se houver) · Diurno sábado · Diurno domingo · Noturno par · Noturno ímpar
- **Diurno**: Diurno (todos os dias de funcionamento)

Par/ímpar = 12x36 pelo dia do mês (par = 2, 4, 6…; ímpar = 1, 3, 5…).
O "+ adicionar" da vaga já sabe o posto e o turno: basta escolher alguém da reserva ou digitar um nome novo.

**Escala dupla**: ao colocar numa vaga um QRA que já tem outra vaga (no mesmo posto ou em outro), o app pergunta "É ESCALA DUPLA?". Se houver choque de horário, recusa; se houver dobra (turno colado), avisa. Confirmando, o QRA aparece com o selo **2× ESCALA DUPLA** nas duas vagas e na lista, e qualquer cobertura para onde ele for mandado é verificada contra as duas escalas. O ✕ tira só aquela vaga.

## Alertas
- Card **pisca** (igual ao QTI) com "🚨 PRECISA DE COBERTURA" + data e turno sempre que houver folga sem cobertura nos próximos 7 dias ou turno de fim de semana vago em posto híbrido (a partir de segunda).
- Botão 📱 exporta para o WhatsApp: 🟢 titular · 🟡 cobertura · 🔴 sem cobertura · ⚪ ninguém escalado, mais a lista do que precisa de cobertura.

## Configuração (uma vez)
1. Criar um projeto novo no [Firebase Console](https://console.firebase.google.com) (ex.: `front-security-coberturas`).
2. Criar o **Realtime Database** e, em **Regras**, publicar:
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
3. Em ⚙️ Configurações do projeto → Seus apps → `</>` (Web), registrar o app e copiar o `firebaseConfig`.
4. Colar o `firebaseConfig` no app (⚙️). Os postos do QTI são importados automaticamente no primeiro acesso.
