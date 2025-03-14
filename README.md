# Weather App

**Weather App** je jednostavna mobilna aplikacija za prikaz vremenske prognoze. Omogućava korisnicima da pretražuju vremenske uslove za određeni grad, prikazujući trenutne podatke (temperaturu, vlažnost, brzinu vetra itd.) i petodnevnu prognozu. Aplikacija podržava tamnu i svetlu temu, a koristi se za učenje i demonstraciju osnovnih koncepata mobilnog razvoja.

---

## Funkcionalnosti

1. **Pretraga vremenske prognoze**:
   - Korisnici mogu uneti ime grada i dobiti trenutne vremenske uslove.
   - Prikazuje se temperatura, vlažnost, pritisak, brzina vetra, izlazak i zalazak sunca, vidljivost i ikonica vremena.

2. **Petodnevna prognoza**:
   - Prikazuje dnevne prognoze za narednih 5 dana.
   - Za svaki dan prikazuje se datum, temperatura, ikonica vremena i opis.

3. **Tamna i svetla tema**:
   - Aplikacija podržava prebacivanje između tamne i svetle teme.
   - Tema se automatski prilagođava sistemskim postavkama korisnika.

4. **Navigacija**:
   - Koristi se **Expo Router** za navigaciju između ekrana.
   - Postoji dugme za povratak na prethodni ekran.

5. **Animacije**:
   - Dugme za pretragu ima jednostavnu animaciju prilikom klika.

6. **Optimizacija**:
   - Filtriranje podataka za petodnevnu prognozu kako bi se prikazala samo jedna prognoza po danu.

---

## Okruženje i Tehnologije

- **Okruženje**:
  - Razvojno okruženje: **Expo** (React Native framework za brzi razvoj mobilnih aplikacija).
  - Platforma: **iOS** i **Android**.

- **Programski jezici i alati**:
  - **TypeScript**: Glavni programski jezik za pisanje aplikacije.
  - **React Native**: Biblioteka za izgradnju korisničkog interfejsa.
  - **Expo Router**: Za navigaciju između ekrana.
  - **Axios**: Za HTTP zahteve ka OpenWeatherMap API-ju.
  - **React Native Reanimated**: Za animacije (npr. animirano dugme za pretragu).
  - **Ionicons**: Za ikonice.

---

## Korišćeni API

- **OpenWeatherMap API**:
  - Koristi se za dobijanje podataka o vremenskoj prognozi.
  - Endpointi:
    - Trenutna prognoza: `https://api.openweathermap.org/data/2.5/weather`
    - Petodnevna prognoza: `https://api.openweathermap.org/data/2.5/forecast`

---

## Glavne Komponente

1. **`index.tsx`**:
   - Glavni ekran za pretragu vremenske prognoze.
   - Prikazuje formu za unos grada i dugme za pretragu.

2. **`details.tsx`**:
   - Ekran sa detaljima o vremenskoj prognozi.
   - Prikazuje trenutne podatke i petodnevnu prognozu.

3. **`explore.tsx`**:
   - Ekran za istraživanje dodatnih informacija o aplikaciji.

4. **`_layout.tsx`**:
   - Glavni layout aplikacije.
   - Upravlja navigacijom i temama.

5. **`ThemeContext.tsx`**:
   - Kontekst za upravljanje temama (tamna/svetla).

---

## Instalacija i Pokretanje

1. Klonirajte repozitorijum:
   ```bash
   git clone https://github.com/vas-username/weather-app.git
   cd weather-app

2. Dodajte Vas API kljuc sa `https://api.openweathermap.org`
