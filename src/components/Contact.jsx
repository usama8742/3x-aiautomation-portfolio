import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Send, CheckCircle2, Sparkles, MessageSquare, ExternalLink, RefreshCw } from 'lucide-react';
const SERVICE_OPTIONS = [
  "AI Agent",
  "AI Chatbot",
  "Voice Agent",
  "Workflow Automation",
  "CRM Automation",
  "AI Website",
  "API Integration",
  "Other"
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Agent',
    automationGoal: "",
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'success' | 'activate_needed' | 'fallback'

  const getSubject = () => {
    return `New Project Inquiry: ${formData.service || 'AI Automation'} - ${formData.name || 'Website Visitor'}`;
  };

  const getBodyText = () => {
    return (
      `Hi 3X AI Automation team,\n\nI would like to discuss an AI automation project.\n\n` +
      `Name: ${formData.name || 'Not provided'}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Service Needed: ${formData.service || 'AI Agent'}\n` +
      `Automation Goal: ${formData.automationGoal || 'Not specified'}\n\n` +
      `Additional Notes:\n${formData.message || 'None'}\n\n` +
      `Sent from the 3X AI Automation website contact form.`
    );
  };

  // Direct Web Gmail Draft URL (Opens in browser)
  const getGmailWebLink = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBodyText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=contactbyusama@gmail.com&su=${subject}&body=${body}`;
  };

  // Standard mailto link
  const getMailtoLink = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBodyText());
    return `mailto:contactbyusama@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // Direct live dispatch to FormSubmit for contactbyusama@gmail.com
      const response = await fetch("https://formsubmit.co/ajax/contactbyusama@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          service: formData.service,
          automation_goal: formData.automationGoal,
          message: formData.message || "No additional message",
          _subject: `New 3X Automation Lead: ${formData.name} (${formData.service})`,
          _replyto: formData.email,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (data && (data.success === "true" || data.success === true)) {
        setSubmissionStatus('success');
      } else if (data && data.message && data.message.toLowerCase().includes('activate')) {
        setSubmissionStatus('activate_needed');
      } else if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('fallback');
      }

      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FE330A', '#D62705', '#FFFFFF', '#38BDF8', '#10B981']
      });

    } catch (error) {
      console.warn("Form transmission note:", error);
      // In case of adblockers or network restrictions, trigger fallback view with 1-click Gmail/Mail app
      setSubmissionStatus('fallback');
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FE330A', '#D62705', '#FFFFFF']
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#EFEAE3] border-t border-[#DBD6CF]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAE3] border border-[#DBD6CF] text-[#FE330A] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Client Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight leading-tight mb-4">
            Let's Build Something <span className="text-[#FE330A]">Intelligent.</span>
          </h2>
          <div className="space-y-1 text-base sm:text-lg text-slate-600 font-normal">
            <p>Have an AI idea, automation project, or business process you'd like to improve?</p>
            <p>Send us a message and we will reply within one business day.</p>
          </div>
        </div>

        {/* Contact Grid: Form on Left/Center (7 cols) + Direct Info on Right (5 cols) */}
        <div className="max-w-4xl mx-auto">
          
          {/* Form Container (7 cols) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DBD6CF] shadow-card">
            
            {submitted ? (
              <div className="text-center py-6 sm:py-8 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-[#191919]">
                    {submissionStatus === 'success' ? 'Message sent.' : 'One more step.'}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                    {submissionStatus === 'success'
                      ? 'Thanks. We read every inquiry ourselves and reply within one business day.'
                      : 'We could not send this automatically from your browser. Use one of the buttons below to send it from your email instead.'}
                  </p>
                </div>

                {/* Submitted Summary Box */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#EFEAE3] border border-[#DBD6CF] text-left text-xs space-y-1.5 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Client Name:</span>
                    <span className="font-bold text-[#191919]">{formData.name || 'Visitor'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Client Email:</span>
                    <span className="font-bold text-[#191919]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Service Requested:</span>
                    <span className="font-bold text-[#FE330A]">{formData.service}</span>
                  </div>
                  {formData.company && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Company:</span>
                      <span className="font-bold text-[#191919]">{formData.company}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#DBD6CF]/70">
                    <span className="text-slate-500 font-medium block mb-0.5">Goal:</span>
                    <p className="text-slate-800 italic bg-white p-2 rounded-lg border border-[#DBD6CF]/50">
                      "{formData.automationGoal}"
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                {submissionStatus !== 'success' && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getGmailWebLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FE330A] to-[#D62705] hover:shadow-glow transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Gmail</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <a
                    href={getMailtoLink()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-[#DBD6CF] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open in Mail App</span>
                  </a>
                </div>
                )}

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        service: 'AI Agent',
                        automationGoal: '',
                        message: ''
                      });
                    }}
                    className="text-xs font-bold text-[#FE330A] hover:underline inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Send another message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Name <span className="text-[#FE330A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DBD6CF] bg-[#EFEAE3] text-sm text-[#191919] placeholder:text-slate-400 focus:outline-none focus:border-[#FE330A] focus:bg-white focus:ring-1 focus:ring-[#FE330A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email <span className="text-[#FE330A]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DBD6CF] bg-[#EFEAE3] text-sm text-[#191919] placeholder:text-slate-400 focus:outline-none focus:border-[#FE330A] focus:bg-white focus:ring-1 focus:ring-[#FE330A] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Service Dropdown */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Realty / Logistics LLC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DBD6CF] bg-[#EFEAE3] text-sm text-[#191919] placeholder:text-slate-400 focus:outline-none focus:border-[#FE330A] focus:bg-white focus:ring-1 focus:ring-[#FE330A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service Needed <span className="text-[#FE330A]">*</span>
                    </label>
                    <select
                      aria-label="Service needed"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DBD6CF] bg-[#EFEAE3] text-sm text-[#191919] focus:outline-none focus:border-[#FE330A] focus:bg-white focus:ring-1 focus:ring-[#FE330A] transition-colors"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* What would you like to automate? */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    What would you like to automate? <span className="text-[#FE330A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Qualify inbound web leads and sync with our CRM & WhatsApp"
                    value={formData.automationGoal}
                    onChange={(e) => setFormData({ ...formData, automationGoal: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#DBD6CF] bg-[#EFEAE3] text-sm text-[#191919] placeholder:text-slate-400 focus:outline-none focus:border-[#FE330A] focus:bg-white focus:ring-1 focus:ring-[#FE330A] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message / Additional Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your current manual bottlenecks, tools you use (n8n, HubSpot, custom DB), and your target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#DBD6CF] bg-[#EFEAE3] text-sm text-[#191919] placeholder:text-slate-400 focus:outline-none focus:border-[#FE330A] focus:bg-white focus:ring-1 focus:ring-[#FE330A] transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button Stack */}
                <div className="space-y-3 pt-1">
                  {/* Primary Direct Form Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-azzle-primary w-full py-4 text-sm uppercase tracking-wider font-bold shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting to contactbyusama@gmail.com...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Project Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Secondary 1-Click Direct Web Gmail Button */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={getGmailWebLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[50px] text-xs font-bold text-[#191919] bg-[#EFEAE3] hover:bg-[#FE330A] hover:text-white transition-all border border-[#DBD6CF]"
                      title="Open draft in Gmail with fields pre-filled"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail Web</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    <a
                      href={getMailtoLink()}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[50px] text-xs font-bold text-[#191919] bg-white hover:bg-black hover:text-white transition-all border border-[#DBD6CF]"
                      title="Open in your default mail app"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open in Mail App</span>
                    </a>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <p className="text-[11px] text-slate-500">
                    Need instant response? Email directly to{' '}
                    <a href="mailto:contactbyusama@gmail.com" className="font-bold text-[#FE330A] hover:underline">
                      contactbyusama@gmail.com
                    </a>
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
