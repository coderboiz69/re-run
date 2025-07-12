# Gurukul Points Management System (GSTATUS)

## Overview

This is a comprehensive student points management system built for a Gurukul (residential school) environment. The system tracks student points, manages transactions, provides rankings, and offers analytics for monitoring student performance and discipline.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS for styling
- **Component Library**: Radix UI components with custom styling (shadcn/ui)
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Database Client**: Neon serverless client for PostgreSQL connections
- **API Design**: RESTful API with JSON responses

### Build System
- **Frontend**: Vite with React plugin
- **Backend**: ESBuild for production bundling
- **TypeScript**: Shared type definitions between frontend and backend
- **Development**: Hot module replacement with Vite dev server

## Key Components

### Database Schema
- **Students**: Core student information (ID, name, room, floor, points, grade, status)
- **Points Transactions**: History of all point additions/deductions with reasons
- **Activity Logs**: System activity tracking for audit purposes
- **System Stats**: Aggregated statistics for dashboard display

### API Endpoints
- Student management (CRUD operations)
- Points transaction handling
- Search and filtering capabilities
- Rankings and statistics
- Activity logging

### Frontend Features
- **Dashboard**: Overview with statistics and recent activity
- **Student Management**: Complete student lifecycle management
- **Points Management**: Add/subtract points with predefined reasons
- **Rankings**: Floor-wise and overall student rankings
- **Analytics**: Performance metrics and trends
- **Reports**: Data export and reporting capabilities

## Data Flow

1. **Student Registration**: New students added with basic information
2. **Points Tracking**: Points added/deducted based on behavior and achievements
3. **Real-time Updates**: UI updates reflect database changes immediately
4. **Grade Calculation**: Automatic grade assignment based on point thresholds
5. **Activity Logging**: All system actions logged for audit trail

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Database connectivity
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI component primitives
- **express**: Web server framework
- **zod**: Schema validation

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Node.js server running via tsx for TypeScript execution
- Database migrations via Drizzle Kit
- Replit-specific tooling for cloud development

### Production
- Frontend built as static assets via Vite
- Backend bundled with ESBuild as single executable
- PostgreSQL database (Neon) for production data
- Environment-based configuration for database URL

### Configuration Management
- Environment variables for database connection
- Separate development and production configurations
- Database URL validation with error handling
- TypeScript path aliases for clean imports

## Key Architectural Decisions

### Database Choice
- **PostgreSQL with Neon**: Chosen for reliability, scalability, and serverless capabilities
- **Drizzle ORM**: Selected for type safety and developer experience over traditional ORMs
- **Connection Pooling**: Implemented for efficient database resource management

### State Management
- **React Query**: Chosen over Redux for server state management due to caching, synchronization, and devtools
- **Local State**: React hooks for component-level state management
- **Form State**: React Hook Form for performant form handling

### UI/UX Design
- **Tailwind CSS**: Utility-first approach for rapid UI development
- **Radix UI**: Accessible, unstyled components as foundation
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### API Design
- **RESTful Architecture**: Standard HTTP methods and status codes
- **JSON API**: Consistent request/response format
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Input validation using Zod schemas

This architecture provides a scalable, maintainable, and user-friendly system for managing student points in an educational environment.