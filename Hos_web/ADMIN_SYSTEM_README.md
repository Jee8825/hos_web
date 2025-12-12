# Admin System Implementation

## Overview
Complete Admin System for HavenWell Health website with comprehensive management features.

## Features Implemented

### 1. Navigation
- ✅ Added "Admin" link to main navigation bar
- ✅ Clicking Admin opens the Admin Dashboard

### 2. Admin Layout Components

#### Admin Header
- Logo (clickable → goes to homepage)
- Hospital name: "HavenWell Health - Admin"
- Logout button (returns to homepage)

#### Admin Footer
- Copyright message at bottom
- Consistent styling with main site

#### Admin Sidebar
- Persistent left-side navigation
- Menu items:
  - Dashboard
  - User Management
  - Service Management
  - Back to Home Page
- Responsive (collapsible on mobile)
- Active state highlighting

### 3. Admin Dashboard
- **Statistics Cards:**
  - Total Users (from localStorage)
  - Active Services (12 default)
  - Total Appointments (from localStorage)
  - Animated hover effects
  
- **Interactive Graphs:**
  - Monthly User Logs (Line Chart)
  - Monthly Appointments (Bar Chart)
  - Using Recharts library
  
- **Additional Stats:**
  - Growth Rate card
  - This Month summary card
  
- **Responsive Design:**
  - Grid layout adapts to all screen sizes
  - Cards stack on mobile

### 4. User Management

#### Features:
- **Display Users Table:**
  - Username column
  - Email column
  - Actions column (More Details, Delete)
  
- **Add User:**
  - Floating dialog form
  - Fields: Name, Email, Phone, Password
  - **Regex Validations:**
    - Name: 2-100 characters, letters only, spaces/hyphens/apostrophes allowed
    - Email: RFC 5322 compliant format
    - Phone: International format, minimum 10 digits
    - Password: 8+ characters, uppercase, lowercase, number, special character
  - Duplicate email check
  - Real-time error messages
  
- **Delete User:**
  - Removes from localStorage
  - Adds to deletedUsers list
  - Updates table immediately
  
- **Deleted User Login:**
  - Shows message: "You were removed by the admin"
  - Automatically opens signup form
  
- **More Details:**
  - Shows full user information
  - Name, Email, Phone in dialog

### 5. Service Management

#### Features:
- **Display Services Table:**
  - Service Name
  - Description (truncated)
  - Actions (Show Details, Edit, Delete)
  
- **Add Service:**
  - Floating dialog form
  - Fields:
    - Service Name
    - Description
    - Key Services (comma-separated)
    - Icon (Material UI icon selector)
  - **Regex Validations:**
    - Service Name: 3-100 characters, alphanumeric with special chars (&, -, (), spaces)
    - Description: 10-500 characters
    - Key Services: Each feature 2-100 characters
  - Duplicate service name check
  - Real-time error messages
  
- **Edit Service:**
  - Pre-fills current data
  - Same validation as Add
  - Updates localStorage and table
  
- **Delete Service:**
  - Confirmation dialog with service name
  - Removes from localStorage
  - Updates table immediately
  
- **Show Details:**
  - Displays full service information
  - Title, Description, Key Features list
  - OK button to close

### 6. Integration with Main Site

#### ServicesPage Integration:
- Loads services from localStorage if available
- Falls back to default services
- Icon mapping for dynamic rendering
- Maintains same card layout and styling

#### LoginSignup Integration:
- Checks deletedUsers list on login
- Shows admin removal message
- Redirects to signup if user was deleted

### 7. Styling & UX

#### Consistent Theme:
- Colors: #A51C30 (primary), #F0A202 (secondary), #FF7E7E (accent)
- Fonts: "Viga" (headings), "Noto Serif Georgian" (body)
- Same button styles and animations

#### Animations:
- Smooth page transitions
- Card hover effects (translateY, shadow)
- Button hover animations
- Dialog fade-in effects
- Responsive transitions

#### Responsive Design:
- Mobile-first approach
- Collapsible sidebar on mobile
- Hamburger menu for mobile navigation
- Tables adapt to small screens
- Cards stack vertically on mobile

### 8. Data Persistence

#### localStorage Keys:
- `users` - Array of user objects
- `deletedUsers` - Array of deleted user emails
- `services` - Array of service objects
- `appointments` - Array of appointments (for stats)

#### Data Structure:

**User Object:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!"
}
```

**Service Object:**
```json
{
  "title": "Cardiology",
  "description": "Comprehensive cardiac care...",
  "features": ["Angioplasty", "Bypass Surgery"],
  "icon": "FavoriteIcon"
}
```

### 9. Validation Rules

#### User Validation:
- **Name:** `/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/`
- **Email:** `/^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\\.[a-zA-Z]{2,})+$/`
- **Phone:** `/^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$/`
- **Password:** `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()_+=\\[\\]{}|;:'\",.<>\\/\\\\`~-])[A-Za-z\\d@$!%*?&#^()_+=\\[\\]{}|;:'\",.<>\\/\\\\`~-]{8,128}$/`

#### Service Validation:
- **Service Name:** `/^[a-zA-Z0-9\\s&()-]+$/` (3-100 chars)
- **Description:** 10-500 characters
- **Features:** Each 2-100 characters

### 10. File Structure

```
src/
├── components/
│   ├── AdminHeader.jsx          # Admin header with logo & logout
│   ├── AdminFooter.jsx          # Admin footer with copyright
│   ├── AdminSidebar.jsx         # Sidebar navigation
│   ├── Header.jsx               # Updated with Admin link
│   └── LoginSignup.jsx          # Updated with deleted user check
├── pages/
│   ├── AdminLayout.jsx          # Admin layout wrapper
│   ├── AdminDashboard.jsx       # Dashboard with stats & graphs
│   ├── UserManagement.jsx       # User CRUD operations
│   ├── ServiceManagement.jsx    # Service CRUD operations
│   └── ServicesPage.jsx         # Updated to use localStorage
├── router/
│   └── AppRoutes.jsx            # Updated with admin routes
├── styles/
│   └── adminStyles.css          # Admin-specific styles
└── App.jsx                      # Updated to hide header/footer on admin routes
```

### 11. Dependencies Added
- `recharts` - For dashboard graphs and charts

## Usage

### Accessing Admin:
1. Click "Admin" in main navigation
2. Opens Admin Dashboard

### Managing Users:
1. Navigate to User Management
2. Click "Add User" to create new user
3. Click info icon to view details
4. Click delete icon to remove user

### Managing Services:
1. Navigate to Service Management
2. Click "Add Service" to create new service
3. Click edit icon to modify service
4. Click delete icon to remove service
5. Click info icon to view full details

### Viewing Statistics:
1. Dashboard shows real-time stats
2. Graphs display monthly trends
3. Cards show growth metrics

## Security Notes
- Passwords stored in localStorage (for demo purposes)
- In production, implement proper authentication
- Add role-based access control
- Use secure backend API

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
