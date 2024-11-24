# App Features & Limitations

## CoinList Page

### Features Implemented

#### 1. **Dashboard View**
- Displays a list of cryptocurrencies with the following details:
  - **Name**
  - **Symbol**
  - **Price**
  - **24h Change**
  - **Market Cap**
- **Skeleton Loader** for a smoother loading experience.

#### 2. **Search & Sort**
- **Search** by **name** or **symbol**.
- **Sort** by **Price**, **24h Change**, and **Market Cap**.

#### 3. **Lazy Loading for Images**
- Images are loaded only when they enter the viewport, saving bandwidth.
- **Skeleton loader placeholder** for images while they are loading.

#### 4. **Tooltip for 24h Price Change**
- Added **tooltips** for better understanding of the 24h price change data.

---

### Limitations

#### 1. **Pagination**
Pagination has not been fully implemented due to the absence of an endpoint that provides the total number of cryptocurrency coins. If such an endpoint were available, pagination could be implemented where:

- The first few page numbers and the last page would be visible.
- An option to skip to a specific page would be included.

#### 2. **Search & Sort Limitations**
- **Search** and **sort** are currently limited to the data on the current page due to the lack of a global data-fetching API. Ideally, these should work across all available coins.


## CryptoCurrency Details Page

#### 1. **Information Display**
- Displays detailed information about the selected cryptocurrency:
  - **Description**
  - **Market Cap Rank**
  - **24h Trading Volume**
  - **Current Price**

#### 2. **Navigation**
- **Go Back** button to return to the dashboard.

#### 3. **Price History**
- Displays a **line chart** showing the selected cryptocurrency's price history.
- Timeframes available for selection:
  - **1 Day**
  - **7 Days**
  - **1 Month**
  - **3 Months**
  - **1 Year**
- Any change in timeframe will trigger a **loader for the chart component only**, not for the entire page.

#### 4. **Mobile View - Description**
- The description is limited to **300 characters** on mobile devices.
- A **"Read More"** option allows users to expand the description.

#### 5. **Refresh Button**
- **Refresh** button to fetch updated cryptocurrency details.

#### 6. **Skeleton Loader**
- **Skeleton loader** for the cryptocurrency details page.

#### 7. **Pulsating Loader**
- **Pulsating loader** for the chart component during data fetching.

---

## Overall Features

#### 1. **Light/Dark Theme Toggle**
- Implemented a **theme toggle** to allow users to switch between light and dark themes.

#### 2. **React Query Caching**
- Used **React Query** for caching API data to improve load times and reduce redundant network requests.

#### 3. **Responsive Layout**
- Fully **responsive** layout, ensuring a seamless experience on mobile and desktop.

#### 4. **Tailwind CSS**
- **Tailwind CSS** is used for clean, utility-based styling, making the app easy to scale and maintain.

#### 5. **useIntersectionObserver Hook**
- Implemented a custom **`useIntersectionObserver`** hook for **lazy loading images**, improving performance.


## Additional Features (Implemented but Not Required)

#### 1. **Mock Data Fallback**
- **Mock data** is used as a fallback when API rate limits are reached, with a disclaimer to inform the user that mock data is being displayed.

#### 2. **Network Call Delay**
- Introduced a **100ms artificial delay** in network calls to ensure loading views are visible.

