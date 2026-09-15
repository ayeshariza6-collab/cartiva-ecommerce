import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/ScrollReveal';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Message sent successfully! We\u2019ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const contactInfo = [
    {
      Icon: Mail,
      label: 'Email Us',
      value: 'support@cartiva.shop',
      desc: 'We reply within 24 hours',
    },
    {
      Icon: Phone,
      label: 'Call Us',
      value: '+91 98765 43210',
      desc: 'Mon\u2013Sat, 9 AM \u2013 7 PM',
    },
    {
      Icon: MapPin,
      label: 'Visit Us',
      value: 'Bengaluru, Karnataka',
      desc: 'India \u2014 560001',
    },
  ];

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-primary-950">
        <div className="section-container py-14 lg:py-20 text-center">
          <ScrollReveal>
            <span className="badge bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-5">
              <MessageSquare className="w-3 h-3" /> Get in Touch
            </span>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-neutral-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto">
              Have a question, suggestion, or just want to say hello? We\u2019d love to hear from
              you. Our team is here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <div className="grid sm:grid-cols-3 gap-6">
            {contactInfo.map((info, i) => (
              <ScrollReveal key={info.label} delay={i * 100}>
                <div className="card p-6 text-center group hover:shadow-card-hover transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <info.Icon className="w-7 h-7 text-primary-700 dark:text-primary-400" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-neutral-800 dark:text-neutral-100 mb-1">
                    {info.label}
                  </h3>
                  <p className="text-sm font-medium text-primary-700 dark:text-primary-400 mb-1">
                    {info.value}
                  </p>
                  <p className="text-xs text-neutral-400">{info.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + support hours */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="card p-6 lg:p-8">
                  <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                    Fill out the form below and we\u2019ll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Name <span className="text-error-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`input-field ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                          placeholder="Your full name"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className="text-xs text-error-500 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Email <span className="text-error-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`input-field ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                          placeholder="your@email.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Subject <span className="text-error-500">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className={`input-field ${errors.subject ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                        placeholder="What is this about?"
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && <p className="text-xs text-error-500 mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Message <span className="text-error-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`input-field resize-none ${errors.message ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                        placeholder="Tell us how we can help you..."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p className="text-xs text-error-500 mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Support hours */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={150}>
                <div className="card p-6 sticky top-28">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-neutral-800 dark:text-neutral-100">
                        Support Hours
                      </h3>
                      <p className="text-xs text-neutral-400">We\u2019re here to help</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { day: 'Monday \u2013 Friday', hours: '9:00 AM \u2013 7:00 PM' },
                      { day: 'Saturday', hours: '10:00 AM \u2013 6:00 PM' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((item) => (
                      <div key={item.day} className="flex justify-between items-center py-2 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">{item.day}</span>
                        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{item.hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400" />
                      <p className="text-sm font-semibold text-primary-800 dark:text-primary-300">
                        Quick Response Promise
                      </p>
                    </div>
                    <p className="text-xs text-primary-700 dark:text-primary-400">
                      We respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
