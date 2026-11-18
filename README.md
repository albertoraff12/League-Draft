# Draftcore · Personal Edition

Versione web statica dell'artefatto LoL Draft Assistant, con dark mode fissa.
Pronta per un repository GitHub e per GitHub Pages. Nessun account applicativo, server, chiave API o abbonamento richiesto dall'app.

## Pubblicazione su GitHub Pages

1. Crea un repository. Per un uso personale non caricare backup o dati privati.
2. Estrai lo ZIP e carica **il contenuto** nella radice del repository, non lo ZIP né una cartella contenitore. `index.html` deve trovarsi nella radice. Includi `.nojekyll` e, se desideri i test automatici, `.github`.
3. Nel repository apri **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona il branch che contiene i file, normalmente `main`, e la cartella **/(root)**. Salva.
6. Quando la pubblicazione è terminata, apri il collegamento mostrato da GitHub Pages.

Non occorre `npm install` né una compilazione. Il workflow incluso esegue soltanto i test, non pubblica il sito.
La disponibilità di Pages per repository privati dipende dal piano GitHub. Non rendere pubblico un archivio con dati personali per aggirare questa limitazione.

## Primo utilizzo e dati precedenti

- Apri Champion Select e seleziona i ruoli.
- Registra matchup e sinergie nella Matchup Library.
- Per recuperare dati dall'artefatto precedente, genera lì il backup JSON versione 1 e importalo in **Database → Backup e ripristino**.
- I dati non possono essere trasferiti automaticamente dalla conversazione al sito.

## Persistenza

Le modifiche vengono salvate automaticamente in `localStorage` nel browser e nell'origine del sito. I dati non sono inviati a GitHub e non vengono condivisi fra utenti o dispositivi.

- Cambiare browser, dominio o dispositivo non trasferisce l'archivio.
- La navigazione privata, il blocco dello storage o la cancellazione dei dati del sito possono impedire o eliminare il salvataggio.
- Su GitHub Pages i progetti dello stesso dominio condividono l'origine: questa app usa una chiave dedicata, ma non è un isolamento di sicurezza fra progetti dello stesso account.
- Scarica periodicamente un backup JSON e conservalo fuori dal repository.
- I backup contengono tutte le note personali: non pubblicarli.
- In caso di dati locali non leggibili, l'app non li sovrascrive automaticamente. Un ripristino valido riabilita il salvataggio.

## Offline

Il service worker memorizza l'interfaccia e i profili statici dopo una prima apertura online completata su HTTPS o localhost. Per verificare la disponibilità offline, ricarica una volta online e poi prova senza rete. La cache può essere rimossa dal browser e non sostituisce il backup.

Per gli aggiornamenti del codice, cambia il nome della cache in `sw.js`. La nuova versione attende la chiusura delle vecchie schede prima di attivarsi. Gli aggiornamenti non cancellano `localStorage`.

## Funzioni

- Draft manuale 5v5, ricerca, filtri, ban ed esclusioni.
- Top 3, tutti i candidati e compatibilità relativa inferiore.
- Score interi, confidenza euristica, motivazioni e rischi.
- Matchup personali 1–10: aggiunta, modifica, eliminazione, note e condizioni di lane.
- Relazioni distinte: ADC nemico, support nemico, support alleato.
- Matrice colorata per tipo di relazione e filtro difficoltà.
- Pool ADC/APC esteso e modificabile, aggiunta campioni e editor profili tattici.
- Pesi configurabili e filtri esatti per patch, elo e regione.
- Import statistiche JSON con metadati obbligatori e validazione.
- Backup scaricabile e ripristino da file o testo, compatibile con l'artefatto versione 1.

## Limiti e affidabilità

Questa è la **versione web dell'artefatto**, non l'app Windows Tauri/SQLite.

- I profili tattici iniziali sono giudizi qualitativi, non dati statistici verificati. Alcuni support/tank/assassini condividono profili di archetipo semplificati.
- Il roster e il pool iniziali non sono certificati come completi o aggiornati al meta corrente. Puoi aggiungere qualsiasi campione e cambiare il pool.
- Non ci sono statistiche online precaricate, scraping, chiamate a Riot o API di terzi.
- Immagini ufficiali, aggiornamento Data Dragon e integrazione con il client non sono inclusi. Si usano iniziali.
- Range e difficoltà restano N/D finché non li inserisci da una fonte verificata.
- Il motore è una base euristica: non modella ogni interazione fra abilità, build o coppie di bot lane.
- Il win rate non dimostra un vantaggio causale. Lo score non è probabilità di vittoria e la confidenza non è un intervallo statistico.
- I dati mancanti non diventano statistiche inventate: il ranking rinormalizza i pesi sulle componenti disponibili. Senza contesto o dati non assegna punteggi.

## Statistiche autorizzate

Compila `stats-template.json` soltanto con dati che sei autorizzato a utilizzare. Il template è intenzionalmente vuoto e non è importabile finché non viene compilato.

Campi obbligatori:

| Campo | Significato |
|---|---|
| champion | Nome esatto nel database |
| kind | general, adc, enemySupport oppure synergy |
| target | Campione collegato; vuoto per general |
| winRate | Percentuale 0–100 |
| source | Fonte dichiarata |
| patch | Patch di riferimento |
| updatedAt | Data AAAA-MM-GG |
| elo | Filtro elo utilizzato |
| region | Regione utilizzata |
| role | BOTTOM |

`games`, `pickRate` e `banRate` sono opzionali. Usa `null` se non disponibili.
L'import non verifica l'autorizzazione o l'autenticità della fonte. Non modifica mai l'archivio personale. Record con la stessa combinazione campione/relazione/target/fonte/patch/elo/regione/ruolo vengono sostituiti.

## Avvio locale

Servi la cartella con un server HTTP statico. Se hai Python:

```bash
python -m http.server 8080
```

Apri localhost sulla porta 8080. Non aprire `index.html` con doppio clic: i moduli JavaScript richiedono HTTP/HTTPS.

## Test

Con Node.js 22 o successivo:

```bash
npm test
```

Nessuna dipendenza da installare. I test coprono motore, filtri, validazione e roundtrip backup; non sostituiscono test manuali dell'interfaccia nei browser.

## Struttura

- `index.html`: pagina e navigazione.
- `styles.css`: dark mode fissa e layout responsive.
- `app.js`: interfaccia, storage e import/export.
- `engine.mjs`: scoring e validazione indipendenti dalla UI.
- `data.mjs`: profili qualitativi iniziali.
- `sw.js`: cache offline.
- `manifest.webmanifest`, `icon.svg`: metadati dell'app web.
- `tests/`: test automatici con dati sintetici chiaramente etichettati.

## Privacy e marchi

Nessun analytics, font remoto, cookie o servizio cloud applicativo. Il caricamento del sito è gestito dall'hosting scelto, che può registrare richieste HTTP secondo le proprie condizioni. Non inserire credenziali o chiavi API nel codice pubblico.

Draftcore non è approvato né affiliato a Riot Games e non riflette le opinioni di Riot Games o di chiunque sia ufficialmente coinvolto nella produzione o gestione delle sue proprietà. League of Legends e i nomi dei campioni appartengono ai rispettivi titolari. La licenza del codice non concede diritti sui marchi o sui contenuti di terzi.
