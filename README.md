# DT208G - Programmering i TypeScript, Moment 5 Projekt

## Projektbeskrivning
Detta projekt är en webbapplikation utvecklad för SWEUNiVERSiTETET, ett fiktivt universitet, för att underlätta för studenter att söka bland kurser och skapa ett personligt ramschema.

Projektet har utvecklats som en del av kursen DT208G - Programmering i TypeScript.

## Om applikationen
Applikationen är byggd med Angular, HTML och TypeScript. Styling har gjorts med SCSS. All interaktion på applikationen hanteras genom Angulars komponenter och databinding. Användare kan filtrera kurser i tabellen genom att söka efter kurskod eller kursnamn, samt välja ut specifika ämnen för filtrering på ämne. Användare kan även sortera kurstabellen i stigande och fallande ordning baserat på kurskod, kursnamn, poäng eller ämne. Det går desdutom att lägga till kurser i ett eget ramchema och att ladda ner applikationen som en PWA.

### Huvudfunktioner
Webbapplikationen består av följande huvudfunktioner:

* **Sökfunktion**: Användare kan söka efter kurser baserat på kurskod eller kursnamn.
* **Filtreringsfunktion**: Användare kan filtrera ut kurser baserat på det ämne som kursen tillhör genom att välja ett ämne i rullisten.
* **Sorteringsfunktion**: Kurser kan sorteras efter kurskod, kursnamn, poäng eller ämne genom att klicka på respektive rubrik för kolumnen.
* **Ramschema**: Användare kan lägga till valda kurser i ett personligt ramschema. Detta schema lagras i webbläsarens localStorage så att det är åtkomligt även efter att sidan laddats om.
* **PDF Export**: Användare kan exportera sitt ramschema till en PDF-fil, vilket möjliggör nedladdning och utskrift för personligt bruk. Detta implementeras med hjälp av jsPDF-biblioteket.
* **Pagination**: För att hantera och kunna navigera i stora datamängder används pagination i kurslistningen.
* **Dark Mode**: Ett mörkt läge för användargränssnittet kan aktiveras. Om användaren har dark mode påslaget i sina inställningar så aktiveras mörkt läge automatiskt i applikationen.
* **Responsiv Design**: Webbplatsen är optimerad för att automatiskt anpassa sig till olika skärmstorlekar.

### Tekniker och verktyg
* **Angular & TypeScript**: Applikationen är byggd med Angular som ramverk och TypeScript som programmeringsspråk.
* **Services**: Två huvudservices används; CourseService för att hantera data om kurser och SchemeService för hantering av ramschema.'
* **Interfaces**:  För att säkerställa typning och strukturera data mer effektivt, har interfaces för kurser, kursämnen och styling av kursämnen skapats.
* **LocalStorage**: För att behålla ramschemat även efter att sidan har laddats om används localStorage.
* **HttpClient**: Används för att hämta kursdata från en extern JSON-fil.
* **Angular Router**: Används för att hantera navigation och routing mellan olika sidor i applikationen, vilket stödjer single-page applications.
* **Angular Material**: Används för komponenter som slide toggles.
* **NgxPagination**: För paginering av kurslistan.
* **jsPDF**: Används för att generera och ladda ner PDF-filer av användarens ramschema.
* **PWA (Progressive Web App)**: Applikationen är en PWA, vilket gör det möjligt att installera den på användarens enhet och använda offline.

## Om
* **Av:** Isa Westling
* **Kurs:** DT208G Programmering i TypeScript
* **Program:** Webbutvecklingsprogrammet
* **År:** 2024
* **Skola:** Mittuniversitetet