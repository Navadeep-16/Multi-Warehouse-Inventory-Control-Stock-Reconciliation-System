import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Hexagon, Lock, Mail, ShieldAlert, Eye, EyeOff, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { login as loginApi, register as registerApi } from '../api/authApi';

export const LoginPage = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [themeMode, setThemeMode] = useState('light'); // 'light' (Image 1 style) or 'dark' (Image 2 style)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('MANAGER');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setIsLoading(true);
    try {
      if (isLogin) {
        const { token } = await loginApi(username, password);
        login(token);
        window.location.href = '/dashboard';
      } else {
        await registerApi(username, password, role);
        setIsLogin(true);
        setInfoMessage('Registration successful! You can now log in with your credentials.');
      }
    } catch (err) {
      const resData = err.response?.data;
      setError(resData?.message || resData?.error || (typeof resData === 'string' ? resData : err.message) || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError('');
    setInfoMessage(`Initializing Single Sign-On with ${provider}... (Demo Mode: Autofilling credentials)`);
    // Autofill demo credentials for instant login testing
    setUsername('admin@nexora.sys');
    setPassword('admin123');
  };

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-x-hidden ${
      isDark 
        ? 'bg-[#050608] text-[#F5F3EE]' 
        : 'bg-white text-[#111111]'
    }`}>
      {/* Background Subtle Accent Gradients */}
      {isDark ? (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D6A85F]/10 blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#64748B]/10 blur-[140px] pointer-events-none"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 pointer-events-none"></div>
      )}

      {/* Top Header Controls: Back Button (Top Left) */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
            isDark
              ? 'bg-[#111720] border-[#1E293B] text-gray-300 hover:text-white hover:border-gray-500 shadow-md'
              : 'bg-white border-gray-200 text-gray-700 hover:text-black hover:bg-gray-100 shadow-sm'
          }`}
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Top Header Controls: Theme Switcher (Top Right) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
            isDark
              ? 'bg-[#111720] border-[#1E293B] text-[#D6A85F] hover:border-[#D6A85F]/50 shadow-md'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm'
          }`}
          title="Toggle Light / Dark Mode"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-gray-700" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10 py-6">
        
        {/* Brand Logo & Headline Header (Image 1 & Image 2 visual identity) */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          {/* Logo Icon */}
          <div className="mb-4 relative group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
              isDark 
                ? 'bg-[#0B1017] border border-[#D6A85F]/30 shadow-[0_0_20px_rgba(214,168,95,0.15)] text-[#D6A85F]' 
                : 'bg-black text-white shadow-lg'
            }`}>
              <Hexagon className="w-8 h-8 stroke-[2]" fill="currentColor" fillOpacity={0.15} />
            </div>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white font-mono tracking-[0.1em]' : 'text-gray-900 font-sans'
          }`}>
            {isDark 
              ? (isLogin ? 'LOG INTO NEXORA' : 'REGISTER ACCESS NODE')
              : (isLogin ? 'Log into Nexora' : 'Create Nexora Account')
            }
          </h1>

          <p className={`text-xs sm:text-sm mt-2 tracking-wide max-w-md ${
            isDark ? 'text-gray-400 font-mono uppercase tracking-widest' : 'text-gray-500'
          }`}>
            {isLogin 
              ? 'Real-Time Inventory Intelligence Platform' 
              : 'Initialize your system identity and credentials'
            }
          </p>
        </div>

        {/* Outer Form Card with Split Layout */}
        <div className={`w-full rounded-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-[#0B1017] border border-[#1E293B] shadow-2xl p-6 sm:p-10 md:p-12' 
            : 'bg-white sm:border border-gray-100 sm:shadow-xl p-4 sm:p-8 md:p-12'
        }`}>

          {/* Feedback Messages */}
          {error && (
            <div className={`p-4 mb-6 rounded-lg text-sm flex items-start gap-3 border ${
              isDark ? 'bg-red-950/40 text-red-300 border-red-800/50' : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className={`p-4 mb-6 rounded-lg text-sm flex items-start gap-3 border ${
              isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Grid Layout: Left (Credentials Form) | Center (Divider) | Right (Social SSO) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-stretch">
            
            {/* LEFT COLUMN: Credentials Form */}
            <div className="flex flex-col justify-between space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* EMAIL ADDRESS Field */}
                <div className="space-y-2">
                  <label className={`text-[11px] font-bold uppercase tracking-widest block ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Email Address / Operator ID
                  </label>
                  <div className="relative">
                    <Input 
                      type="text" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                      className={`w-full h-12 px-4 transition-all text-sm rounded-lg ${
                        isDark 
                          ? 'bg-[#111720] border-[#1E293B] text-white placeholder:text-gray-600 focus:border-[#D6A85F] focus:ring-1 focus:ring-[#D6A85F]' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black'
                      }`}
                      placeholder={isDark ? "operator@nexora.sys" : "name@example.com"}
                    />
                  </div>
                </div>

                {/* PASSWORD Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className={`text-[11px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      className={`w-full h-12 pl-4 pr-11 transition-all text-sm rounded-lg ${
                        isDark 
                          ? 'bg-[#111720] border-[#1E293B] text-white placeholder:text-gray-600 focus:border-[#D6A85F] focus:ring-1 focus:ring-[#D6A85F]' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black'
                      }`}
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                      }`}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ROLE SELECTION (Register mode only) */}
                {!isLogin && (
                  <div className="space-y-2 pt-1">
                    <label className={`text-[11px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Access Level / Role
                    </label>
                    <select 
                      className={`flex h-12 w-full rounded-lg border px-4 text-sm font-medium transition-all ${
                        isDark 
                          ? 'bg-[#111720] border-[#1E293B] text-white focus:border-[#D6A85F]' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-black'
                      }`}
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="MANAGER">MANAGER (Full Inventory Control)</option>
                      <option value="STAFF">STAFF (Read & Order Operations)</option>
                    </select>
                  </div>
                )}

                {/* LOG IN Submit Button */}
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className={`w-full h-12 font-bold tracking-widest text-xs uppercase rounded-lg transition-all duration-200 ${
                      isDark
                        ? 'bg-[#D6A85F] text-[#050608] hover:bg-[#F0C982] shadow-[0_0_20px_rgba(214,168,95,0.25)]'
                        : 'bg-[#f2f2f2] hover:bg-[#e4e4e4] text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm'
                    }`} 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Authenticating...
                      </span>
                    ) : (
                      isLogin ? (isDark ? 'AUTHENTICATE' : 'LOG IN') : 'CREATE ACCOUNT'
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* MIDDLE DIVIDER: Vertical line with centered "OR" badge */}
            <div className="flex md:flex-col items-center justify-center relative py-4 md:py-0">
              {/* Vertical line for desktop */}
              <div className={`hidden md:block w-px h-full ${
                isDark ? 'bg-[#1E293B]' : 'bg-gray-200'
              }`}></div>
              
              {/* Horizontal line for mobile */}
              <div className={`md:hidden w-full h-px ${
                isDark ? 'bg-[#1E293B]' : 'bg-gray-200'
              }`}></div>

              {/* OR Badge */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${
                isDark 
                  ? 'bg-[#0B1017] border-[#1E293B] text-gray-500' 
                  : 'bg-white border-gray-200 text-gray-400'
              }`}>
                OR
              </div>
            </div>

            {/* RIGHT COLUMN: Social SSO Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className={`w-full h-12 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-3 border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#111720] border-[#1E293B] text-white hover:bg-[#161D2A] hover:border-gray-700'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className={`w-full h-12 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-3 border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#111720] border-[#1E293B] text-white hover:bg-[#161D2A] hover:border-gray-700'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                }`}
              >
                <svg className={`w-5 h-5 ${isDark ? 'fill-white' : 'fill-black'}`} viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.81 1.44-.61.71-1.15 1.86-1.01 2.96 1.07.08 2.16-.56 2.83-1.36z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className={`w-full h-12 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-3 border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#111720] border-[#1E293B] text-white hover:bg-[#161D2A] hover:border-gray-700'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                }`}
              >
                <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Continue with Facebook</span>
              </button>

            </div>

          </div>

          {/* Bottom Footer Link */}
          <div className={`mt-10 pt-6 border-t text-center ${
            isDark ? 'border-[#1E293B]' : 'border-gray-100'
          }`}>
            <button 
              type="button"
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-[#D6A85F]' 
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setInfoMessage('');
              }}
            >
              {isLogin 
                ? (isDark ? '» REQUEST NEW OPERATOR IDENTITY' : "CAN'T LOG IN? CREATE ACCOUNT")
                : (isDark ? '« RETURN TO AUTHENTICATION' : 'ALREADY HAVE AN ACCOUNT? LOG IN')
              }
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

