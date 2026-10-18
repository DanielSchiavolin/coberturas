# Front Security — Coberturas

App separado do QTI Monitor (banco de dados próprio). Mesmos postos (QTHs) e mesmo layout.

## O que ele faz
- **QRAs por posto**: cadastrar, editar e excluir pela própria tela (aba 👥 QRAs ou "👤 + QRA" no card do posto).
- **Lista de QRAs**: busca por nome ou posto, mostrando o posto, o turno e o **próximo empenho** de cada um.
- **Alerta de folga**: lançar "fulano de folga no dia tal". O posto passa a alertar (piscar + som, igual ao QTI) até alguém ser escalado para cobrir.
- **QRA de cobertura**: escolher da lista ou digitar um nome temporário. O app avisa se houver:
  - ⛔ **choque**: a pessoa já está empenhada no mesmo turno (como titular ou em outra cobertura);
  - ⚠️ **dobra**: empenho no turno anterior ou no posterior;
  - ⚠️ posto que não opera nesse turno.
- **Google Agenda**: botão 📅 em cada folga/cobertura abre o evento já preenchido.
- **Tempo real**: se um atualiza, todos veem (Firebase Realtime Database).

- **Tirar do posto**: o ✕ no nome do QRA (card do posto) ou "🚫 Tirar do posto" na lista. O QRA continua cadastrado como **reserva** e pode cobrir.
- **Fim de semana dos postos híbridos**: a partir de segunda-feira, todo turno de sábado/domingo sem ninguém (sem titular presente e sem cobertura) fica alertando (borda laranja no posto, seção no topo de "Folgas & Coberturas", som a cada 2 h) até ser preenchido.

## Turnos
Mesmo modelo do QTI: Turno 1 (☀️ Diurno) 00:00–16:59 · Turno 2 (🌙 Noturno) 17:00–23:59.
- Postos **24h**: QRAs em **Diurno par**, **Diurno ímpar**, **Noturno par** ou **Noturno ímpar** (12x36 pelo dia do mês: par = dias 2, 4, 6…; ímpar = 1, 3, 5…).
- Postos diurnos/noturnos: Diurno ou Noturno. Híbridos: todas as opções.

## Configuração (uma vez)
1. Criar um projeto novo no [Firebase Console](https://console.firebase.google.com) (ex.: `front-security-coberturas`).
2. Criar o **Realtime Database** e, em **Regras**, publicar:
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
3. Em ⚙️ Configurações do projeto → Seus apps → `</>` (Web), registrar o app e copiar o `firebaseConfig`.
4. Colar o `firebaseConfig` no app (⚙️). Os postos do QTI são importados automaticamente no primeiro acesso.
