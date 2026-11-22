# NotToWaste 🍽️

A prototype platform for managing stock and reducing food waste in restaurants. It tracks ingredients, registers waste, warns about products close to expiry, and generates sustainability reports for managers and customers.

**Live demo (frontend only):** https://nottowaste-2.onrender.com
> Note: the homepage and profile selection page are available in the live demo. The backend depended on an external service that is no longer active, so the full functionality is not available there.

---

## 🎯 About

Restaurants often lose food because stock is not monitored closely: portions are too large, products are forgotten or pass their expiry date, and meals are poorly planned. NotToWaste brings stock, waste and sustainability data into one place, so the team can see where food is lost and act on it.

## ✨ Features

- **Stock management:** record ingredient entries and exits, and keep the stock updated
- **Waste tracking:** record wasted ingredients with quantity, cost and reason (expired, badly prepared, returned by a customer, or partly eaten)
- **Expiry alerts:** notifications when a product is 7 days from its expiry date
- **Smart menus:** suggestions for dishes that use ingredients close to expiry
- **Dish availability:** dishes with missing ingredients are blocked, and the client sees only available dishes
- **Sustainability reports:** monthly waste indicators, a ranking of the most wasted ingredients, and PDF exports
- **Sustainability score:** calculated from ingredient consumption and waste
- **Role-based access:** each user type sees only the pages they are allowed to use

## 👥 User Roles

| Role | Access |
|------|--------|
| Stock employee | Stock, Waste |
| Manager | All pages |
| Cook | Kitchen, Waste |
| Head chef | Dashboard, Kitchen, Manage Dishes, Waste |

Selecting a role on the profiles page simulates a login and stores the selected profile in global state (context).

## 🖥️ Pages

1. **Home:** navbar with the logo, application name, search and user icon. The menu shows only the options the user can access. Clicking a locked option shows a "Service unavailable / No permission" popup.
2. **Profiles:** grid of profiles (Manager, Stock Employee, Head Chef, Cook) that simulates login.
3. **Client:** grid of available dishes (image, name, optional ingredients), locked unavailable dishes, and buttons to download sustainability and most-wasted-ingredient reports.
4. **Stock:** table of ingredients (name, quantity, expiry date, opening date) with + / - buttons, add popup and confirmation.
5. **Waste:** table of wasted ingredients (name, quantity, reason, date) with + / - buttons, add popup and confirmation.
6. **Kitchen:** dish and ingredient grid with search, switching between dishes and ingredients, and automatic stock deduction when a dish is selected.
7. **Manage Dishes:** add, view, edit and delete dishes and ingredients, with search and filters. Editing ingredients is limited to the head chef.
8. **Dashboard:** notifications for ingredients expiring within 7 days, sustainability score, waste percentage, monetary value of waste, and report downloads.
   Sustainability score: `100 - (monetary waste / total spent on purchases) * 100`
9. **Settings:** alert configuration: suggestions for dishes with expiring ingredients, and 7-day expiry alerts. The number of days is adjusted with + / -.

## 🛠️ Tech Stack

**Front-end**
- React and TypeScript
- Vite
- HTML, CSS and Bootstrap

**Back-end**
- C# REST API
- Microsoft SQL Server
- xUnit and Coverlet for unit tests

**Tools**
- Visual Studio, SSMS, VS Code
- GitHub Projects for sprints and task tracking

## 🚀 Getting Started (Front-end)

1. **Clone the repository:**
   ```bash
   git clone git@github.com:mimicarreira13/NotToWaste.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```
   The front-end should open at `http://localhost:5173/` (or the port set in the configuration).

## 📁 Project Structure

```
NotToWaste/
├── README.md
├── index.html
├── eslint.config.js
├── package.json
├── vite.config.js
├── src/
│   ├── assets/          # Images, icons and other static files
│   │   └── images/
│   ├── components/      # Reusable components (Navbar, buttons, cards, etc.)
│   │   └── Navbar.tsx
│   ├── pages/           # Individual pages
│   │   ├── Home.tsx
│   │   └── ...
│   ├── App.tsx          # Main component, where routes are defined
│   └── main.tsx         # React entry point
└── node_modules/        # Dependencies
```

- **assets/:** images, icons and other static files
- **components/:** reusable components such as the navbar, buttons and cards
- **pages/:** individual pages of the application
- **App.tsx:** main component that defines the routes
- **main.tsx:** React entry point, where the app is mounted

## 🧪 Testing and Validation

- **Back-end unit tests:** written with xUnit, covering the business layer. Coverlet reported about 88% line coverage and 65% branch coverage.
- **User tests:** each team member ran 1 to 3 participant sessions. Participants completed a set of tasks and a SUS questionnaire, and the system scored **86.35/100**, which the team interpreted as excellent usability. This was a small study, so treat the result as an early indication.
- **Interviews:** validation interviews covered both the management and the customer perspective. All participants understood the main goal of the system.

**Next steps identified by the team:** improve the display of stock and waste, improve responsiveness so visual elements do not overlap, and enrich the information shown to the customer.

## 👩‍💻 Team

Developed as a group project for *Processos e Métricas de Software*, Universidade da Madeira (2025/2026).

| Member | Role |
|--------|------|
| Alexandra Barbeito | Researcher, Designer, Front-end |
| Angel David Abreu Parra | Back-end, Tester |
| Josefa Monteiro | Back-end Leader, Tester |
| Leandro Hontman | Designer, Front-end, Tester |
| Leonardo Henriques | Researcher, Back-end |
| Leonardo Sousa | Researcher, Back-end |
| Maria Catarina Freitas | Project Manager, Front-end |
| Milena Carreira | Front-end Leader, Tester |

---

> _"Every ingredient counts."_ 🌱
