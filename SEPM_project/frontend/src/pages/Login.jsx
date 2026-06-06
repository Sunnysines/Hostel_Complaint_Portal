import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const { loginContext } = useAuth();
  
  const [netid, setNetid] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!netid || !password) {
      setError('Please enter both NetID and Password.');
      return;
    }

    try {
      setLoading(true);
      const user = await authService.login({ netid, password });
      loginContext(user);
      
      if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/complaints');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-[#f0f2f5] dark:bg-[#0f172a] min-h-screen flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-5xl w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden login-card-shadow border border-gray-100 dark:border-slate-800" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Header Section */}
        <div className="p-8 text-center border-b border-gray-100 dark:border-slate-800">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center text-white">
                <img className="mt-1" src={`${import.meta.env.BASE_URL}srm-logo.png`} width="275px" height="90px" alt="SRM IST" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row">
          
          {/* Info Side */}
          <div className="flex-1 p-10 bg-gray-50 dark:bg-slate-800/50">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Dear Student,</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-medium text-lg">Welcome to the Student Hostel Complaint Portal.</p>
              <p>This dedicated platform allows you to report maintenance issues, track the status of your complaints, and view official responses from the hostel administration office.</p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-primary mt-6">
                <p className="text-sm">
                  <span className="font-bold block mb-1">Login Instructions:</span>
                  Please use your official NetID credentials to log in. 
                  <br/>(e.g., If your email is <span className="font-mono text-primary">abcd@university.edu.in</span>, your NetID is <span className="font-mono font-bold">abcd</span> and password will be your email password.)
                </p>
              </div>
            </div>
          </div>
          
          {/* Login Form Side */}
          <div className="w-full md:w-[400px] p-10 border-l border-gray-100 dark:border-slate-800">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-1">Student Portal</h3>
              <div className="h-1 w-12 bg-primary rounded"></div>
            </div>
            
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="netid">
                  NetID (without '@university.edu.in')
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-400 text-sm">person</span>
                  </div>
                  <input 
                    className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm dark:text-white transition-all" 
                    id="netid" 
                    placeholder="NetID" 
                    type="text"
                    value={netid}
                    onChange={(e) => setNetid(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-400 text-sm">lock</span>
                  </div>
                  <input 
                    className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm dark:text-white transition-all" 
                    id="password" 
                    placeholder="Password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-right mt-1">
                  <a className="text-xs font-medium text-primary hover:underline" href="#">Forgot Password?</a>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="captcha">
                  Captcha
                </label>
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-icons text-gray-400 text-sm">security</span>
                    </div>
                    <input 
                      className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm dark:text-white transition-all" 
                      id="captcha" 
                      placeholder="Enter Captcha" 
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded border border-gray-200 dark:border-slate-600 font-serif italic text-xl tracking-widest text-red-600 dark:text-red-400 font-bold select-none">
                      uZhJB
                    </div>
                    <button className="text-gray-400 hover:text-primary transition-colors" type="button">
                      <span className="material-icons text-xl">refresh</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full flex items-center justify-center mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="material-icons text-sm mr-2 animate-spin">autorenew</span>
                ) : (
                  <span className="material-icons text-sm mr-2">login</span>
                )}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:underline">
                    Register Now
                </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Dark Mode Toggle */}
      <button 
        className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 transition-all hover:scale-110" 
        onClick={toggleDarkMode}
      >
        <span className="material-icons text-primary block dark:hidden">dark_mode</span>
        <span className="material-icons text-yellow-400 hidden dark:block">light_mode</span>
      </button>
    </div>
  );
}
