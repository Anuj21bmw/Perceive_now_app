# Perceive Now - Intelligence Dashboard

> **"Make Intelligence Feel Inevitable"** - Where every decision is backed by data, and every insight builds trust.

## 🎯 Overview

Perceive Now is an enterprise intelligence dashboard that transforms raw data into actionable insights. Built as a UX-facing systems engineering project, it demonstrates how to create decision engines wrapped in intuition rather than traditional dashboards.

**Key Philosophy**: Every click should justify a million-dollar strategy through transparent, traceable intelligence.

## ✨ Features

### 🔐 **Role-Based Authentication**
- **Viewer Role**: Standard access to reports and basic analytics
- **Reviewer Role**: Advanced access with detailed source analysis and feedback capabilities
- **Quick Access**: One-click login buttons for seamless role switching
- **JWT Security**: Token-based authentication with automatic session management

### 📊 **Intelligence Dashboard**
- **Real-time Statistics**: Live metrics showing report counts, confidence averages, and quality indicators
- **Smart Filtering**: Filter reports by type, industry, and confidence threshold
- **Visual Confidence Scoring**: Animated meters showing data reliability (0-100%)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📋 **Report Management**
- **Comprehensive Reports**: Market analysis, competitive intelligence, risk assessments, financial forecasts
- **Detailed View**: Slide-out panels with tabbed interface for deep exploration
- **Executive Summaries**: Key findings and actionable insights prominently displayed
- **Metadata Tracking**: Analyst information, methodologies, and data sources

### 🔍 **Source Traceability** 
- **Complete Transparency**: Every insight backed by verifiable sources
- **Reliability Scoring**: Data source quality ratings with visual indicators
- **Methodology Details**: Expandable cards showing research methods and data collection processes
- **Trust Building**: Users can verify the foundation of every recommendation

### 💬 **Feedback System**
- **User Ratings**: 5-star rating system for report quality
- **Section Flagging**: Ability to flag specific report sections for review
- **Improvement Suggestions**: Text input for enhancement recommendations
- **Continuous Loop**: Feedback directly improves future intelligence quality

### 🎨 **Modern UX**
- **Dark/Light Mode**: Toggle between themes using custom brand colors
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Enterprise Design**: Clean, professional interface built with Tailwind CSS
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start (30 seconds)

### Prerequisites
- Node.js 16+
- Python 3.11+
- npm or yarn

### Installation & Setup

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

**Access the Application:**
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8001/docs
- **Health Check**: http://localhost:8001/health

## 🔐 Demo Credentials

### Quick Access (Recommended)
1. Visit http://localhost:3001
2. Click the **purple "Viewer"** button for standard access
3. Or click the **gold "Reviewer"** button for advanced features

### Manual Login
- **Viewer Access**: `viewer_user` / `viewer_pass`
- **Reviewer Access**: `reviewer_user` / `reviewer_pass`

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── LoginForm.tsx           # Authentication interface
│   │   ├── ReportDashboard.tsx     # Main dashboard
│   │   ├── ReportCard.tsx          # Report preview cards
│   │   ├── ReportDetailPanel.tsx   # Detailed report view
│   │   ├── FilterPanel.tsx         # Advanced filtering
│   │   ├── ConfidenceMeter.tsx     # Animated confidence visualization
│   │   ├── SourceTraceCard.tsx     # Source verification
│   │   └── FeedbackForm.tsx        # User feedback interface
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx         # Authentication state
│   │   └── ThemeContext.tsx        # Theme management
│   ├── services/           # API services
│   │   ├── authService.ts          # Authentication API calls
│   │   └── apiService.ts           # Report and feedback APIs
│   └── App.tsx             # Main application component
```

### Backend (FastAPI + Python)
```
backend/
├── app/
│   └── main.py             # FastAPI application with all endpoints
├── requirements.txt        # Python dependencies
└── README.md              # Backend documentation
```

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, Axios
- **Backend**: FastAPI, Python 3.11+, JWT Authentication, Uvicorn
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animation**: Framer Motion

## 📡 API Endpoints

### Authentication
- `POST /auth/token` - User login with credentials
- `GET /auth/me` - Get current user information

### Reports
- `GET /api/v1/reports` - List all reports with optional filtering
- `GET /api/v1/reports/{id}` - Get specific report details
- `GET /api/v1/reports/types/` - Get available report types
- `GET /api/v1/reports/industries/` - Get available industries

### Feedback
- `POST /api/v1/feedback/` - Submit user feedback
- `GET /api/v1/feedback/report/{id}` - Get feedback for specific report

### System
- `GET /` - API welcome message
- `GET /health` - Health check endpoint

## 🎨 Design System

### Color Palette
- **Primary Purple**: `#3F1470` - Main brand color, primary actions
- **Gold Accent**: `#FFA301` - Secondary actions, reviewer role, highlights
- **Dark Theme**: Custom dark mode with high contrast ratios
- **Success**: Green tones for positive metrics and confirmations
- **Warning**: Yellow/orange for medium confidence scores
- **Error**: Red tones for low confidence and alerts

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System fonts (system-ui, sans-serif)
- **Weights**: 300, 400, 500, 600, 700

### Component Patterns
- **Cards**: Elevated surfaces with hover effects
- **Buttons**: Consistent sizing with color-coded roles
- **Forms**: Clean inputs with proper validation states
- **Navigation**: Sticky header with role indicators
- **Animations**: Smooth transitions, loading states, micro-interactions

## 🔧 Development

### Development Commands
```bash
# Frontend development
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test          # Run test suite

# Backend development  
cd backend
uvicorn app.main:app --reload    # Start with auto-reload
uvicorn app.main:app --port 8001 # Start on specific port
```

### Environment Configuration
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:8001

# Backend (environment variables)
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code style enforcement
- **Prettier**: Automated code formatting
- **Error Handling**: Comprehensive try-catch blocks
- **CORS**: Properly configured for development and production

## 🚀 Production Considerations

### Security
- JWT tokens with expiration
- CORS configuration for specific domains
- Input validation and sanitization
- HTTPS enforcement in production
- Rate limiting implementation

### Performance
- Code splitting and lazy loading
- Image optimization and compression
- Bundle size optimization
- CDN integration for static assets
- Database indexing and query optimization

### Scalability
- Horizontal scaling with load balancers
- Database migration from in-memory to PostgreSQL/MongoDB
- Caching layer with Redis
- Microservices architecture consideration
- Container orchestration with Kubernetes

### Deployment Options
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: AWS ECS, Google Cloud Run, Digital Ocean App Platform
- **Database**: AWS RDS, Google Cloud SQL, MongoDB Atlas
- **CI/CD**: GitHub Actions, GitLab CI, Jenkins

## 🎯 User Experience Highlights

### Trust-Focused Design
- **Confidence Scoring**: Every report shows reliability metrics
- **Source Traceability**: Complete transparency in data sources
- **Methodology Disclosure**: Users can verify research methods
- **Feedback Integration**: Continuous improvement through user input

### Role-Based Experience
- **Viewer Role**: Streamlined interface focusing on key insights
- **Reviewer Role**: Advanced analytics with detailed source verification
- **Visual Indicators**: Color-coded badges and banners for role clarity
- **Progressive Disclosure**: Information revealed based on user needs

### Performance Features
- **Instant Loading**: Optimized for sub-second page loads
- **Smooth Animations**: 60fps animations that enhance rather than distract
- **Responsive Design**: Seamless experience across all device sizes
- **Offline Capability**: Core features work without internet connection

## 🎬 Demo Walkthrough

### Recommended Demo Flow
1. **Login**: Use quick access buttons to demonstrate role switching
2. **Dashboard**: Show real-time stats and filtering capabilities
3. **Report Detail**: Click into report to show confidence meter and tabs
4. **Source Verification**: Expand source cards to demonstrate traceability
5. **Feedback**: Submit sample feedback to show continuous improvement loop
6. **Theme Toggle**: Demonstrate dark/light mode switching

### Key Demo Points
- Emphasize **trust and transparency** in every interaction
- Show how **confidence scores are earned** through verifiable sources
- Demonstrate **role-based access** with visual indicators
- Highlight **smooth animations** that enhance user experience
- Point out **enterprise-grade design** suitable for executive use

## 📈 Future Enhancements

### Phase 1 (1-2 weeks)
- Real-time data integration
- Advanced filtering with saved searches
- Export functionality (PDF, Excel)
- Email notifications for new reports

### Phase 2 (1-2 months)
- Machine learning confidence prediction
- Collaborative features (comments, sharing)
- Advanced analytics dashboard
- Mobile app development

### Phase 3 (3-6 months)
- API integrations with external data sources
- Custom report generation
- Advanced user management
- Enterprise SSO integration

## 📝 License

All code is original and follows industry best practices for enterprise application development.

