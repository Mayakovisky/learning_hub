# EduFlow Studio

A modern, comprehensive online learning platform built with React and TypeScript. EduFlow Studio provides an intuitive interface for students, instructors, and administrators to manage courses, track progress, and facilitate interactive learning.

## 🎯 Project Overview

EduFlow Studio is a full-featured educational technology platform designed to deliver engaging learning experiences. The application supports multiple user roles with tailored dashboards and features for each role.

### Key Features

#### 👨‍🎓 Student Features
- **Dashboard**: Overview of enrolled courses, recent lessons, achievements, and learning statistics
- **Course Browsing**: Explore and discover new courses from the course catalog
- **Course Management**: View enrolled courses with progress tracking
- **Lesson Viewer**: Interactive lesson player with video content, notes, and resources
- **Lesson Navigation**: Browse course outline and navigate between lessons
- **Real-time Search**: Search courses, lessons, and instructors with instant results
- **Achievements**: Track badges, milestones, and learning accomplishments
- **Leaderboard**: Compete with other learners globally or within courses
- **Messages**: Direct communication with instructors and peers
- **User Profile**: Manage account settings and personal information
- **Notifications**: Stay updated with course updates and achievements

#### 👨‍🏫 Instructor Features
- **Instructor Dashboard**: Manage courses and student interactions
- **Course Management**: Create and manage courses
- **Student Tracking**: Monitor student progress and performance
- **Analytics**: View detailed analytics about courses and student engagement
- **Messaging**: Communicate with students
- **Earnings**: Track course earnings and revenue

#### 🔐 Admin Features
- **Admin Dashboard**: System-wide analytics and management
- **User Management**: Manage all users (students, instructors, admins)
- **Course Management**: Oversee all courses on the platform
- **Analytics**: Platform-wide analytics and reports
- **Payment Management**: Handle transactions and payments
- **System Settings**: Configure platform settings

#### 🌐 Public Features
- **Landing Page**: Compelling introduction to the platform
- **Course Catalog**: Browse available courses
- **Pricing**: Transparent pricing tiers (Starter, Professional, Enterprise)
- **About**: Company information, values, and team
- **Authentication**: Secure login and registration flows

## 🏗️ Project Structure

```
eduflow-studio/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn UI components
│   │   ├── layout/
│   │   │   └── DashboardLayout.tsx   # Main dashboard layout with sidebar & search
│   │   └── NavLink.tsx
│   ├── pages/
│   │   ├── Landing.tsx              # Home page
│   │   ├── Login.tsx                # Login page
│   │   ├── Register.tsx             # Registration page
│   │   ├── ForgotPassword.tsx       # Password recovery
│   │   ├── Pricing.tsx              # Pricing page
│   │   ├── About.tsx                # About page
│   │   ├── Profile.tsx              # User profile page
│   │   ├── Notifications.tsx        # Notifications page
│   │   ├── Messages.tsx             # Messaging page
│   │   ├── Achievements.tsx         # Achievements page
│   │   ├── Leaderboard.tsx          # Leaderboard page
│   │   ├── NotFound.tsx             # 404 page
│   │   ├── courses/
│   │   │   ├── CourseCatalog.tsx    # Browse all courses
│   │   │   ├── CourseDetail.tsx     # Course details & enrollment
│   │   │   └── LessonViewer.tsx     # Lesson player & content
│   │   ├── student/
│   │   │   ├── StudentDashboard.tsx # Student home
│   │   │   └── StudentCourses.tsx   # My courses
│   │   ├── instructor/
│   │   │   └── InstructorDashboard.tsx
│   │   └── admin/
│   │       └── AdminDashboard.tsx
│   ├── hooks/
│   │   └── use-toast.ts             # Toast notifications
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                      # Main app component with routes
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Technology Stack

### Frontend
- **React 18+**: UI library for building interactive components
- **TypeScript**: Type-safe JavaScript development
- **React Router v6**: Client-side routing and navigation
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notification system
- **TanStack Query**: Data fetching and caching

### Styling
- **Tailwind CSS**: Responsive and modern styling
- **Gradient Variants**: Custom gradient utilities
- **CSS Modules**: Component-scoped styling

### Development
- **npm/Bun**: Package management
- **ESLint**: Code quality and linting
- **PostCSS**: CSS processing

## 🎨 Design System

### Color Palette
- **Primary**: Main brand color for CTAs and highlights
- **Accent**: Secondary color for complementary elements
- **Foreground**: Text color on light backgrounds
- **Background**: Page and component backgrounds
- **Muted**: Secondary text and disabled states
- **Border**: Dividing lines and borders

### Components
All UI components use shadcn/ui with Tailwind CSS for consistent styling and responsive behavior.

## 🔄 Key Features Implemented

### Real-Time Search
- Search across courses, lessons, and instructors
- Instant results as you type
- Quick navigation to results
- Category filtering

### Lesson Navigation
- Interactive lesson viewer with video player
- Course outline sidebar for easy navigation
- Progress tracking
- "Resume Learning" button for quick access
- Next lesson recommendations

### Enrollment Flow
- Browse courses in catalog
- View detailed course information
- Enroll with confirmation toast
- Automatic redirect to course detail after enrollment

### User Authentication
- Login and registration flows
- Password recovery
- User profile management
- Role-based access control

### Notifications
- Notification dropdown in header
- Full notifications page
- Toast notifications for user actions
- Notification badges

### Responsive Design
- Mobile-first approach
- Responsive sidebar (collapsible on mobile)
- Touch-friendly components
- Adaptive layouts

## 🔐 Authentication & Authorization

The app supports three user roles:

1. **Student**: Access to courses, lessons, achievements, and community features
2. **Instructor**: Manage courses, track students, and view analytics
3. **Admin**: Full platform management and analytics

Role-based routing ensures users access appropriate pages based on their role.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (lg, xl, 2xl)

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ or Bun
- npm or Bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eduflow-studio
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

### Build for Production

```bash
npm run build
# or
bun run build
```

### Lint & Format

```bash
npm run lint
# or
bun run lint
```

## 📋 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/courses` - Course catalog
- `/pricing` - Pricing page
- `/about` - About page

### Student Routes
- `/student` - Student dashboard
- `/student/courses` - My courses
- `/course/:id` - Course detail page
- `/lesson/:courseId/:lessonId` - Lesson viewer
- `/messages` - Messages
- `/achievements` - Achievements
- `/leaderboard` - Leaderboard
- `/notifications` - Notifications
- `/profile` - User profile

### Instructor Routes
- `/instructor` - Instructor dashboard
- `/messages` - Messages

### Admin Routes
- `/admin` - Admin dashboard

## 🎯 User Flows

### Enrollment Flow
1. Browse courses on landing or catalog
2. Click course to view details
3. Click "Enroll Now" button
4. See confirmation toast
5. Redirect to course detail page
6. Start learning with "Continue Learning" button

### Learning Flow
1. Access student dashboard
2. Click "Resume Learning" or select from recent lessons
3. View lesson in interactive player
4. Navigate between lessons using course outline
5. Mark lessons as complete
6. Track progress in sidebar

### Search Flow
1. Use search box in header
2. Type course, lesson, or instructor name
3. See instant results
4. Click result to navigate
5. Search clears after navigation

## 🔄 Mock Data

The application uses simulated data for:
- Courses and lessons
- User profiles
- Notifications
- Achievements
- Leaderboard rankings
- Search results

Ready to integrate with real APIs when backend is available.

## 📝 Component Documentation

### DashboardLayout
Main layout component for authenticated users with:
- Responsive sidebar navigation
- Header with search and notifications
- Role-based navigation items
- User profile section
- Logout functionality

### LessonViewer
Interactive lesson player featuring:
- Video player placeholder
- Course outline navigation
- Progress tracking
- Notes and resources tabs
- Next lesson recommendations

### StudentDashboard
Student home page with:
- Quick stats cards
- Courses in progress
- Recent lessons
- Achievements showcase
- "Resume Learning" button

## 🎓 Future Enhancements

- Backend API integration
- Real database with user authentication
- Video streaming integration
- Live instructor sessions
- Assignment submission system
- Quiz engine
- Discussion forums
- Mobile app
- Dark/Light theme toggle
- Internationalization (i18n)
- Advanced analytics
- Course creation tools
- Certification system

## 📧 Support

For questions or issues, please reach out to the development team.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

Built with ❤️ by the EduFlow team
