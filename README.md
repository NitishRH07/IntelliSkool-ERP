# IntelliSkool ERP

IntelliSkool ERP is a comprehensive educational management system with AI-powered features for administrators, teachers, students, and parents.

## Features

- Role-based authentication (Admin, Teacher, Student, Parent, Management)
- AI-powered tools for education (Question Paper Generator, Quiz Generator, Timetable Generator, Lesson Planner, etc.)
- Student performance tracking and analytics
- Attendance management
- Communication system
- Dashboard with real-time data visualization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (for AI features)
- Supabase account (for database features)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NitishRH07/IntelliSkool-ERP.git
   ```

2. Navigate to the project directory:
   ```bash
   cd IntelliSkool-ERP
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### For AI Features (Google Gemini):
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

### For Database Features (Supabase):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

To build the application for production:
```bash
npm run build
```

## Deployment

The application can be deployed to Vercel or any other static hosting service.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel project settings:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

## Default Login Credentials (Demo)

- Admin: username: `admin`, password: `password`
- Teacher: username: `teacher`, password: `password`
- Student: username: `student`, password: `password`
- Parent: username: `parent`, password: `password`

## Technologies Used

- React 19
- TypeScript
- Vite 6
- Tailwind CSS
- Google Gemini AI
- Supabase (for database)
- Recharts (for data visualization)

## License

This project is licensed under the MIT License.