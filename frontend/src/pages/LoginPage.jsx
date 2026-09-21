import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Hexagon, ShieldAlert, Eye, EyeOff, Sun, Moon, CheckCircle2, Mail, Lock, ShieldCheck, KeyRound } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, sendCustomerOtp, verifyCustomerOtp } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const [username, setUsername] = useState('admin@nexora.io');
  const [password, setPassword] = useState('admin123');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('ADMIN');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // OTP Modal State for Customer Signup
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [generatedOtpCode, setGeneratedOtpCode] = useState('');
  const [inputOtp, setInputOtp] = useState('');

  const navigateToDashboard = (targetRole) => {
    switch (targetRole) {
      case 'ADMIN': navigate('/admin-dashboard'); break;
      case 'MANAGER': navigate('/manager-dashboard'); break;
      case 'STAFF': navigate('/staff-dashboard'); break;
      case 'CUSTOMER': navigate('/customer-dashboard'); break;
      default: navigate('/manager-dashboard'); break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setIsLoading(true);

    let effectiveRole = role;
    if (username.toLowerCase().includes('admin')) effectiveRole = 'ADMIN';
    else if (username.toLowerCase().includes('manager')) effectiveRole = 'MANAGER';
    else if (username.toLowerCase().includes('staff')) effectiveRole = 'STAFF';
    else if (username.toLowerCase().includes('customer') || username.toLowerCase().includes('gmail')) effectiveRole = 'CUSTOMER';

    if (isLogin) {
      // Login Flow
      setTimeout(() => {
        login(username, effectiveRole);
        setIsLoading(false);
        navigateToDashboard(effectiveRole);
      }, 400);
    } else {
      // Customer Registration Flow with Gmail OTP Verification
      if (role !== 'CUSTOMER' && !username.toLowerCase().includes('customer')) {
        setError('Public registration is restricted to CUSTOMERS only. Manager & Staff accounts must be created by Admin.');
        setIsLoading(false);
        return;
      }

      // Generate OTP and open modal
      const code = sendCustomerOtp(username);
      setGeneratedOtpCode(code);
      setIsLoading(false);
      setOtpModalOpen(true);
    }
  };

  const handleVerifyOtpAndRegister = (e) => {
    e.preventDefault();
    setError('');
    const result = verifyCustomerOtp(username, inputOtp);
    if (!result.success) {
      setError(result.message);
      return;
    }

    setOtpModalOpen(false);
    setInfoMessage('Gmail verified successfully! Account created.');
    login(username, 'CUSTOMER');
    setTimeout(() => {
      navigateToDashboard('CUSTOMER');
    }, 500);
  };

  const handleQuickRoleLogin = (userEmail, userRole) => {
    setError('');
    login(userEmail, userRole);
    navigateToDashboard(userRole);
  };

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-x-hidden ${
      isDark ? 'bg-[#050608] text-[#F5F3EE]' : 'bg-white text-[#111111]'
    }`}>
      {/* Background Gradients */}
      {isDark ? (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E7B65A]/10 blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#5B9CF6]/10 blur-[140px] pointer-events-none"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 pointer-events-none"></div>
      )}

      {/* Top Bar */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
            isDark
              ? 'bg-[#111720] border-[#1E293B] text-gray-300 hover:text-white'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Landing Page</span>
        </Link>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
            isDark
              ? 'bg-[#111720] border-[#1E293B] text-[#E7B65A]'
              : 'bg-white border-gray-200 text-gray-700'
          }`}
        >
          {isDark ? <Sun className="w-3.5 h-3.5 text-[#E7B65A]" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10 py-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-3 relative">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isDark 
                ? 'bg-[#0B1017] border border-[#E7B65A]/30 text-[#E7B65A] shadow-[0_0_20px_rgba(231,182,90,0.15)]' 
                : 'bg-black text-white'
            }`}>
              <Hexagon className="w-8 h-8 stroke-[2]" fill="currentColor" fillOpacity={0.15} />
            </div>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white font-mono' : 'text-gray-900'}`}>
            {isLogin ? 'NEXORA MULTI-ROLE LOGIN' : 'CREATE CUSTOMER ACCOUNT'}
          </h1>

          <p className="text-xs text-[#7F8DA3] mt-1 uppercase tracking-widest font-mono">
            {isLogin ? 'Select target role dashboard to access system' : 'Customer registration requires Gmail OTP verification'}
          </p>

          {/* Toggle Login vs Customer Signup */}
          <div className="flex items-center gap-2 mt-4 bg-[#0D141E] p-1 border border-[#1D2A3A] rounded-xl">
            <button
              onClick={() => { setIsLogin(true); setError(''); setRole('ADMIN'); setUsername('admin@nexora.io'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isLogin ? 'bg-[#E7B65A] text-[#070B11]' : 'text-[#7F8DA3] hover:text-[#F5F7FA]'
              }`}
            >
              Sign In (All 4 Roles)
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); setRole('CUSTOMER'); setUsername('customer@gmail.com'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isLogin ? 'bg-[#E056FD] text-[#070B11]' : 'text-[#7F8DA3] hover:text-[#F5F7FA]'
              }`}
            >
              Customer Sign Up (OTP)
            </button>
          </div>
        </div>

        {/* Outer Form Card */}
        <div className={`w-full rounded-2xl transition-all ${
          isDark ? 'bg-[#0B1017] border border-[#1E293B] shadow-2xl p-6 sm:p-10' : 'bg-white border p-6 sm:p-10'
        }`}>

          {error && (
            <div className="p-4 mb-6 rounded-xl text-xs flex items-start gap-3 bg-red-950/40 text-red-300 border border-red-800/50">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-4 mb-6 rounded-xl text-xs flex items-start gap-3 bg-emerald-950/40 text-emerald-300 border border-emerald-800/50">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <span>{infoMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
            
            {/* LEFT COLUMN: Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block">Full Name</label>
                  <Input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                    className="w-full bg-[#111720] border-[#1E293B] text-white text-xs h-10"
                    placeholder="John Doe Customer"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block">
                  {isLogin ? 'Gmail / Operator ID' : 'Gmail Address (OTP Verification Required)'}
                </label>
                <Input 
                  type="email" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  className="w-full bg-[#111720] border-[#1E293B] text-white text-xs h-10"
                  placeholder="admin@nexora.io or customer@gmail.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block">Password</label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full bg-[#111720] border-[#1E293B] text-white text-xs h-10 pr-10"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLogin ? (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block">Target Dashboard Role</label>
                  <select 
                    className="w-full bg-[#111720] border-[#1E293B] text-white text-xs h-10 rounded-lg px-3 font-semibold"
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="ADMIN">ADMIN (Master System Control)</option>
                    <option value="MANAGER">MANAGER (Operations Supervisory)</option>
                    <option value="STAFF">STAFF (Warehouse Operations & Tasks)</option>
                    <option value="CUSTOMER">CUSTOMER (Store Portal & Orders)</option>
                  </select>
                </div>
              ) : (
                <div className="p-3 bg-[#E056FD]/10 border border-[#E056FD]/30 rounded-xl text-[11px] text-[#E056FD]">
                  <strong>Public Signup Role:</strong> CUSTOMER (Provides access to product catalog, cart, and delivery tracking).
                </div>
              )}

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className={`w-full h-11 font-bold tracking-widest text-xs uppercase rounded-lg transition-all ${
                    !isLogin 
                      ? 'bg-[#E056FD] text-[#050608] hover:bg-[#c846e3]'
                      : 'bg-[#E7B65A] text-[#050608] hover:bg-[#f0c46e]'
                  }`} 
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : isLogin ? `Log In to ${role} Dashboard` : 'Send OTP to Gmail'}
                </Button>
              </div>
            </form>

            {/* MIDDLE DIVIDER */}
            <div className="flex md:flex-col items-center justify-center relative">
              <div className="w-px h-full bg-[#1E293B] hidden md:block"></div>
              <div className="w-full h-px bg-[#1E293B] md:hidden"></div>
              <div className="absolute px-2 py-0.5 text-[10px] font-bold bg-[#0B1017] border border-[#1E293B] text-[#7F8DA3] rounded-full">
                OR
              </div>
            </div>

            {/* RIGHT COLUMN: 4 Quick Role Login Shortcuts */}
            <div className="flex flex-col justify-center space-y-3">
              <div className="text-[11px] font-bold text-[#7F8DA3] uppercase tracking-wider mb-1 text-center md:text-left">
                One-Click Role Authentication
              </div>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('admin@nexora.io', 'ADMIN')}
                className="w-full h-10 px-3 bg-[#111720] border border-[#5B9CF6]/40 text-[#5B9CF6] rounded-xl text-xs font-bold flex items-center justify-between hover:bg-[#5B9CF6]/10 transition-all"
              >
                <span>🔑 Admin Role</span>
                <span className="text-[10px] font-mono opacity-80">admin@nexora.io</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('manager@nexora.io', 'MANAGER')}
                className="w-full h-10 px-3 bg-[#111720] border border-[#E7B65A]/40 text-[#E7B65A] rounded-xl text-xs font-bold flex items-center justify-between hover:bg-[#E7B65A]/10 transition-all"
              >
                <span>👔 Manager Role</span>
                <span className="text-[10px] font-mono opacity-80">manager@nexora.io</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('staff@nexora.io', 'STAFF')}
                className="w-full h-10 px-3 bg-[#111720] border border-[#43C98B]/40 text-[#43C98B] rounded-xl text-xs font-bold flex items-center justify-between hover:bg-[#43C98B]/10 transition-all"
              >
                <span>👤 Staff Role</span>
                <span className="text-[10px] font-mono opacity-80">staff@nexora.io</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('customer@gmail.com', 'CUSTOMER')}
                className="w-full h-10 px-3 bg-[#111720] border border-[#E056FD]/40 text-[#E056FD] rounded-xl text-xs font-bold flex items-center justify-between hover:bg-[#E056FD]/10 transition-all"
              >
                <span>🛍️ Customer Role</span>
                <span className="text-[10px] font-mono opacity-80">customer@gmail.com</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Customer OTP Verification Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B11]/85 backdrop-blur-md p-4">
          <div className="bg-[#0D141E] border border-[#E056FD]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-[#E056FD]">
              <KeyRound className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[#F5F7FA]">Gmail OTP Verification</h3>
            </div>

            <p className="text-xs text-[#7F8DA3]">
              A 6-digit verification OTP was sent to <strong className="text-[#F5F7FA]">{username}</strong>.
            </p>

            {/* Simulated Email Popover Notification */}
            <div className="p-3 bg-[#111A26] border border-[#1D2A3A] rounded-xl space-y-1 text-xs">
              <div className="text-[#E7B65A] font-bold text-[11px] flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> SIMULATED GMAIL NOTIFICATION:
              </div>
              <div className="font-mono text-sm font-bold text-[#43C98B] tracking-widest">
                Verification Code: {generatedOtpCode}
              </div>
              <div className="text-[10px] text-[#7F8DA3]">Valid for 5 minutes. Enter code below to complete registration.</div>
            </div>

            <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block mb-1">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-4 py-2.5 text-center text-lg font-mono tracking-[0.3em] font-bold text-[#F5F7FA] focus:outline-none focus:border-[#E056FD]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOtpModalOpen(false)}
                  className="px-4 py-2 bg-[#111A26] border border-[#1D2A3A] text-[#7F8DA3] font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E056FD] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#c846e3] transition-all"
                >
                  Verify OTP & Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
