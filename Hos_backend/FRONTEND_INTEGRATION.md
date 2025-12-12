# Frontend Integration Guide

## 1. Install Dependencies

```bash
npm install socket.io-client axios
```

## 2. Create API Service (src/services/api.js)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

// Services
export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Users
export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Appointments
export const getAppointments = (status) => api.get('/appointments', { params: { status } });
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

// Messages
export const getMessages = () => api.get('/messages');
export const createMessage = (data) => api.post('/messages', data);

export default api;
```

## 3. Create Socket Service (src/services/socket.js)

```javascript
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      
      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export default new SocketService();
```

## 4. Update App.jsx (Root Component)

```javascript
import { useEffect } from 'react';
import socketService from './services/socket';

function App() {
  useEffect(() => {
    // Connect socket on app mount
    socketService.connect();

    return () => {
      // Disconnect on unmount
      socketService.disconnect();
    };
  }, []);

  return (
    // Your app routes and components
  );
}

export default App;
```

## 5. Update ServicePage.jsx

```javascript
import { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import socketService from '../services/socket';
import ServiceCard from '../components/ServiceCard';

function ServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from DB
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Real-time updates
  useEffect(() => {
    const handleServiceCreated = (service) => {
      setServices(prev => [...prev, service]);
    };

    const handleServiceUpdated = (service) => {
      setServices(prev => prev.map(s => s._id === service._id ? service : s));
    };

    const handleServiceDeleted = ({ id }) => {
      setServices(prev => prev.filter(s => s._id !== id));
    };

    socketService.on('service:created', handleServiceCreated);
    socketService.on('service:updated', handleServiceUpdated);
    socketService.on('service:deleted', handleServiceDeleted);

    return () => {
      socketService.off('service:created', handleServiceCreated);
      socketService.off('service:updated', handleServiceUpdated);
      socketService.off('service:deleted', handleServiceDeleted);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="services-container">
      {services.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

export default ServicePage;
```

## 6. Update Login Component

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(formData);
      const { token, user } = response.data;

      // Store token and user
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Invalid credentials');
      } else if (error.response?.data?.message === 'You were removed by the admin') {
        setError('Your account has been removed. Please sign up again.');
        navigate('/signup');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
```

## 7. Update Signup Component

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await signup(formData);
      const { token, user } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (error) {
      if (error.response?.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
```

## 8. Admin Service Management Component

```javascript
import { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/api';
import socketService from '../services/socket';

function AdminServiceManagement() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keyServices: [],
    iconName: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Real-time updates
  useEffect(() => {
    socketService.on('service:created', (service) => {
      setServices(prev => [...prev, service]);
    });

    socketService.on('service:updated', (service) => {
      setServices(prev => prev.map(s => s._id === service._id ? service : s));
    });

    socketService.on('service:deleted', ({ id }) => {
      setServices(prev => prev.filter(s => s._id !== id));
    });

    return () => {
      socketService.off('service:created');
      socketService.off('service:updated');
      socketService.off('service:deleted');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingService) {
        await updateService(editingService._id, formData);
      } else {
        await createService(formData);
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;

    try {
      await deleteService(id);
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', keyServices: [], iconName: '' });
    setEditingService(null);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Service</button>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>{service.iconName}</td>
              <td>
                <button onClick={() => {
                  setEditingService(service);
                  setFormData(service);
                  setShowModal(true);
                }}>Edit</button>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <input
              placeholder="Icon Name (e.g., FavoriteOutlined)"
              value={formData.iconName}
              onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
              required
            />
            <button type="submit">{editingService ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => {
              setShowModal(false);
              resetForm();
            }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminServiceManagement;
```

## 9. Admin Appointment Management Component

```javascript
import { useState, useEffect } from 'react';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/api';
import { getServices } from '../services/api';
import socketService from '../services/socket';

function AdminAppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRef: '',
    date: '',
    time: '',
    status: 'pending',
    details: ''
  });

  useEffect(() => {
    fetchAppointments(filter);
    fetchServices();
  }, [filter]);

  const fetchAppointments = async (status) => {
    try {
      const response = await getAppointments(status);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Real-time updates
  useEffect(() => {
    socketService.on('appointment:created', (appointment) => {
      if (appointment.status === filter) {
        setAppointments(prev => [...prev, appointment]);
      }
    });

    socketService.on('appointment:updated', (appointment) => {
      if (appointment.status === filter) {
        setAppointments(prev => prev.map(a => a._id === appointment._id ? appointment : a));
      } else {
        setAppointments(prev => prev.filter(a => a._id !== appointment._id));
      }
    });

    socketService.on('appointment:deleted', ({ id }) => {
      setAppointments(prev => prev.filter(a => a._id !== id));
    });

    return () => {
      socketService.off('appointment:created');
      socketService.off('appointment:updated');
      socketService.off('appointment:deleted');
    };
  }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment._id, formData);
      } else {
        await createAppointment(formData);
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this appointment?')) return;

    try {
      await deleteAppointment(id);
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceRef: '',
      date: '',
      time: '',
      status: 'pending',
      details: ''
    });
    setEditingAppointment(null);
  };

  return (
    <div>
      <div className="filters">
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('postponed')}>Postponed</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <button onClick={() => setShowModal(true)}>Add Appointment</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.serviceRef?.title}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                <button onClick={() => {
                  setEditingAppointment(appointment);
                  setFormData({
                    name: appointment.name,
                    email: appointment.email,
                    phone: appointment.phone,
                    serviceRef: appointment.serviceRef._id,
                    date: appointment.date,
                    time: appointment.time,
                    status: appointment.status,
                    details: appointment.details || ''
                  });
                  setShowModal(true);
                }}>Edit</button>
                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <select
              value={formData.serviceRef}
              onChange={(e) => setFormData({ ...formData, serviceRef: e.target.value })}
              required
            >
              <option value="">Select Service</option>
              {services.map(service => (
                <option key={service._id} value={service._id}>{service.title}</option>
              ))}
            </select>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="postponed">Postponed</option>
              <option value="completed">Completed</option>
            </select>
            <textarea
              placeholder="Details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            />
            <button type="submit">{editingAppointment ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => {
              setShowModal(false);
              resetForm();
            }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminAppointmentManagement;
```

## 10. Remove All localStorage Usage

Search your codebase for:
- `localStorage.setItem`
- `localStorage.getItem`
- `localStorage.removeItem`
- `localStorage.clear`

Replace with API calls and socket listeners as shown above.

## 11. Contact Form Component

```javascript
import { useState } from 'react';
import { createMessage } from '../services/api';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && <div className="success">Message sent successfully!</div>}
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactForm;
```

---

## Summary Checklist

✅ Install `socket.io-client` and `axios`  
✅ Create API service with all endpoints  
✅ Create Socket service and connect in App.jsx  
✅ Update all components to fetch from API instead of localStorage  
✅ Add socket listeners for real-time updates  
✅ Store JWT token in sessionStorage (or memory)  
✅ Remove all localStorage usage  
✅ Handle authentication errors (deleted user, invalid credentials)  
✅ Update admin panels with CRUD operations  
✅ Test real-time sync across multiple browser tabs  

Your frontend will now be fully integrated with the MongoDB backend!
