import React, { useState } from 'react';
import { rdb } from '../firebase';
import { push, ref, set } from 'firebase/database';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCommentDots, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

// Add keyframes for animations
const styles = document.createElement('style');
styles.textContent = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(styles);

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', address: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
    else if (!/^[0-9]{10,15}$/.test(form.mobile.replace(/\D/g, ''))) e.mobile = 'Enter a valid mobile number (10-15 digits)';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Please enter a message';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    // sanitize mobile to digits only while typing
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '');
      setForm((s) => ({ ...s, mobile: digits }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  }

  function saveSubmission(payload) {
    try {
      const raw = localStorage.getItem('contact_submissions');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(payload);
      localStorage.setItem('contact_submissions', JSON.stringify(list));
    } catch (err) {
      console.error('saveSubmission', err);
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setStatus(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const payload = { ...form, submittedAt: new Date().toISOString() };
    // Save locally first
    saveSubmission(payload);

    // Attempt to push to Firebase Realtime Database (non-blocking)
    (async () => {
      try {
        if (rdb) {
          const node = push(ref(rdb, 'contact_submissions'));
          await set(node, payload);
        }
      } catch (err) {
        console.warn('Realtime DB save failed', err && err.message ? err.message : err);
      }
    })();

    setStatus('success');
    setForm({ name: '', mobile: '', email: '', address: '', message: '' });
    setTimeout(() => setStatus(null), 4000);
  }

  return (
    <>
      <section style={{ padding: '24px', maxWidth: '1100px', margin: '18px auto', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#003E29', textAlign: 'center', marginBottom: '6px', animation: 'fadeInDown 0.8s ease-out' }}>Contact Us</h2>
        <div style={{ color: '#334455', textAlign: 'center', animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>Fill your details and message below — we will get back to you.</div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6 items-center justify-center mt-6 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500" style={{ maxWidth: '1000px', width: '100%', animation: 'fadeIn 1s ease-out 0.4s both' }}>
          <div className="hidden lg:flex items-center justify-center lg:w-auto flex-shrink-0" aria-hidden="true" style={{ animation: 'slideInLeft 0.8s ease-out 0.6s both' }}>
            <img src={process.env.PUBLIC_URL + '/assest/image/analyze-data.png'} alt="Data analysis illustration" className="w-72 h-auto rounded-lg object-contain hover:scale-110 transition-transform duration-500" />
          </div>
          
          <div className="bg-white p-6 rounded-xl w-full lg:w-auto lg:flex-1 max-w-md" style={{ animation: 'slideInRight 0.8s ease-out 0.6s both' }}>
          <form onSubmit={handleSubmit} className="mt-2 space-y-4" noValidate>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex items-center gap-1" htmlFor="name">
                  <FaUser className="text-green-700" /> Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 pl-3 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
              </div>

              <div className="w-full md:w-1/2 px-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex items-center gap-1" htmlFor="mobile">
                  <FaPhone className="text-green-700" /> Mobile <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="mobile"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 pl-3 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    placeholder="e.g. 9123456789"
                    inputMode="numeric"
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-xs italic mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex items-center gap-1" htmlFor="email">
                  <FaEnvelope className="text-green-700" /> Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 pl-3 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    placeholder="name@domain.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
              </div>

              <div className="w-full md:w-1/2 px-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex items-center gap-1" htmlFor="address">
                  <FaMapMarkerAlt className="text-green-700" /> Address
                </label>
                <div className="relative">
                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 pl-3 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex items-center gap-1" htmlFor="message">
                <FaCommentDots className="text-green-700" /> Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 pl-3 pr-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 h-24 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              {errors.message && <p className="text-red-500 text-xs italic mt-1">{errors.message}</p>}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <FaPaperPlane /> Send Message
              </button>
              {status === 'success' && (
                <div className="bg-green-100 text-green-800 font-bold p-2 rounded-lg text-sm animate-bounce flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> <strong>Thank you!</strong> Your message has been received.
                </div>
              )}
            </div>
          </form>
        </div>
        </div>
      </section>
    </>
  );
}
