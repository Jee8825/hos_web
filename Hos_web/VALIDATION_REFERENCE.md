# Validation Reference Guide

## User Management Validations

### Name Validation
- **Pattern:** `/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/`
- **Rules:**
  - Must start with a letter
  - Can contain letters, spaces, hyphens, apostrophes, periods
  - Length: 2-100 characters
- **Valid Examples:**
  - "John Doe"
  - "Mary-Jane O'Connor"
  - "Dr. Smith"
- **Invalid Examples:**
  - "123John" (starts with number)
  - "J" (too short)
  - "John@Doe" (invalid character)

### Email Validation
- **Pattern:** `/^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\\.[a-zA-Z]{2,})+$/`
- **Rules:**
  - RFC 5322 compliant
  - Must have @ symbol
  - Valid domain with TLD
  - No consecutive dots
- **Valid Examples:**
  - "user@example.com"
  - "john.doe@company.co.uk"
  - "admin123@hospital.org"
- **Invalid Examples:**
  - "user@" (no domain)
  - "@example.com" (no local part)
  - "user..name@example.com" (consecutive dots)

### Phone Validation
- **Pattern:** `/^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$/`
- **Rules:**
  - Minimum 10 digits
  - Optional country code with +
  - Can include spaces, hyphens, dots, parentheses
  - International format supported
- **Valid Examples:**
  - "+1234567890"
  - "(123) 456-7890"
  - "+91 98765 43210"
  - "123-456-7890"
- **Invalid Examples:**
  - "12345" (too short)
  - "abc123456" (contains letters)
  - "++1234567890" (multiple + signs)

### Password Validation
- **Pattern:** `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()_+=\\[\\]{}|;:'\",.<>\\/\\\\`~-])[A-Za-z\\d@$!%*?&#^()_+=\\[\\]{}|;:'\",.<>\\/\\\\`~-]{8,128}$/`
- **Rules:**
  - Minimum 8 characters, maximum 128
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one digit
  - At least one special character
- **Valid Examples:**
  - "SecurePass123!"
  - "MyP@ssw0rd"
  - "Admin#2024$"
- **Invalid Examples:**
  - "password" (no uppercase, digit, special char)
  - "PASSWORD123" (no lowercase, special char)
  - "Pass123" (too short)

---

## Service Management Validations

### Service Name Validation
- **Pattern:** `/^[a-zA-Z0-9\\s&()-]+$/`
- **Rules:**
  - Length: 3-100 characters
  - Can contain letters, numbers, spaces
  - Allowed special characters: & ( ) -
- **Valid Examples:**
  - "Cardiology"
  - "ENT (Ear, Nose & Throat)"
  - "Obstetrics & Gynecology"
  - "24-Hour Emergency"
- **Invalid Examples:**
  - "AB" (too short)
  - "Service@Name" (invalid character @)
  - "Service#1" (invalid character #)

### Description Validation
- **Rules:**
  - Length: 10-500 characters
  - No specific pattern (free text)
  - Must not be empty or only whitespace
- **Valid Examples:**
  - "Comprehensive cardiac care with advanced technology"
  - "Expert neurological services for all age groups"
- **Invalid Examples:**
  - "Short" (less than 10 characters)
  - "" (empty)
  - "   " (only whitespace)

### Key Services/Features Validation
- **Rules:**
  - Comma-separated list
  - Each feature: 2-100 characters
  - At least one feature required
  - Trimmed and filtered (empty values removed)
- **Valid Examples:**
  - "Surgery, Consultation, Emergency Care"
  - "Angioplasty, Bypass Surgery, Pacemaker"
  - "Prenatal Care, High-Risk Pregnancies"
- **Invalid Examples:**
  - "" (empty)
  - "A" (feature too short)
  - "," (only separator)

---

## Error Messages

### User Management Errors
| Field | Error Message |
|-------|--------------|
| Name (empty) | "Name is required" |
| Name (invalid) | "Name must contain only letters (2-100 characters)" |
| Email (empty) | "Email is required" |
| Email (invalid) | "Please enter a valid email address" |
| Email (duplicate) | "A user with this email already exists" |
| Phone (empty) | "Phone number is required" |
| Phone (invalid) | "Please enter a valid phone number (min 10 digits)" |
| Password (empty) | "Password is required" |
| Password (invalid) | "Password must be 8+ characters with uppercase, lowercase, number, and special character" |

### Service Management Errors
| Field | Error Message |
|-------|--------------|
| Service Name (empty) | "Service name is required" |
| Service Name (short) | "Service name must be at least 3 characters" |
| Service Name (long) | "Service name must not exceed 100 characters" |
| Service Name (invalid) | "Service name contains invalid characters" |
| Service Name (duplicate) | "A service with this name already exists" |
| Description (empty) | "Description is required" |
| Description (short) | "Description must be at least 10 characters" |
| Description (long) | "Description must not exceed 500 characters" |
| Features (empty) | "At least one key service is required" |
| Features (short) | "Each key service must be at least 2 characters" |
| Features (long) | "Each key service must not exceed 100 characters" |

---

## Testing Validation

### Test Cases for User Management

#### Valid User Data:
```javascript
{
  name: "John Doe",
  email: "john.doe@hospital.com",
  phone: "+1 (555) 123-4567",
  password: "SecurePass123!"
}
```

#### Invalid User Data (should fail):
```javascript
// Invalid name
{ name: "J", email: "valid@email.com", phone: "1234567890", password: "Pass123!" }

// Invalid email
{ name: "John Doe", email: "invalid.email", phone: "1234567890", password: "Pass123!" }

// Invalid phone
{ name: "John Doe", email: "valid@email.com", phone: "123", password: "Pass123!" }

// Invalid password
{ name: "John Doe", email: "valid@email.com", phone: "1234567890", password: "weak" }
```

### Test Cases for Service Management

#### Valid Service Data:
```javascript
{
  title: "Cardiology",
  description: "Comprehensive cardiac care with state-of-the-art facilities",
  features: "Angioplasty, Bypass Surgery, Pacemaker Implantation",
  icon: "FavoriteIcon"
}
```

#### Invalid Service Data (should fail):
```javascript
// Invalid title
{ title: "AB", description: "Valid description here", features: "Feature 1, Feature 2" }

// Invalid description
{ title: "Cardiology", description: "Short", features: "Feature 1, Feature 2" }

// Invalid features
{ title: "Cardiology", description: "Valid description", features: "A" }
```

---

## Implementation Notes

### Real-time Validation
- Validation triggers on input change
- Error messages clear when user starts typing
- Submit button validates entire form

### User Experience
- Clear, specific error messages
- Red border on invalid fields
- Helper text below each field
- Alert box for form-level errors

### Performance
- Regex compiled once (not on every validation)
- Validation runs client-side (instant feedback)
- No unnecessary re-renders

### Accessibility
- Error messages announced to screen readers
- Proper ARIA labels
- Keyboard navigation supported
- Focus management on errors
