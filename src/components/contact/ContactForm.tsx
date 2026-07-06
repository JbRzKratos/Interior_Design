"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    projectType: "",
    message: "",
    date: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.projectType) newErrors.projectType = "Project type is required";
    if (!formData.budget) newErrors.budget = "Budget range is required";
    if (!formData.date) newErrors.date = "Consultation date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", budget: "", projectType: "", message: "", date: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[var(--color-blueprint-navy)] text-[var(--color-paper)] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full border border-[var(--color-paper)] flex items-center justify-center mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="font-display text-3xl uppercase tracking-tight mb-4">Request Received</h3>
        <p className="font-sans text-[var(--color-paper)]/70 max-w-sm mb-8">
          Thank you for reaching out. A member of our studio team will contact you within 48 hours to confirm your consultation.
        </p>
        <Button onClick={() => setStatus("idle")} variant="secondary" className="border-[var(--color-paper)]/30 text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-blueprint-navy)]">
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-2xl mx-auto" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
            Full Name <span className="text-[var(--color-blueprint-line)]">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "bg-transparent border-b pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none",
              errors.name ? "border-red-500" : "border-[var(--color-ink)]/20"
            )}
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
            Email Address <span className="text-[var(--color-blueprint-line)]">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "bg-transparent border-b pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none",
              errors.email ? "border-red-500" : "border-[var(--color-ink)]/20"
            )}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
            Phone Number
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            className="bg-transparent border-b border-[var(--color-ink)]/20 pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none"
          />
        </div>

        {/* Date Picker */}
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
            Preferred Consult Date <span className="text-[var(--color-blueprint-line)]">*</span>
          </label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={formData.date}
            onChange={handleChange}
            className={cn(
              "bg-transparent border-b pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none appearance-none uppercase text-sm tracking-wide",
              errors.date ? "border-red-500" : "border-[var(--color-ink)]/20"
            )}
          />
          {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Project Type */}
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
            Project Type <span className="text-[var(--color-blueprint-line)]">*</span>
          </label>
          <select 
            id="projectType" 
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={cn(
              "bg-transparent border-b pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none appearance-none cursor-pointer",
              errors.projectType ? "border-red-500" : "border-[var(--color-ink)]/20"
            )}
          >
            <option value="" disabled>Select...</option>
            <option value="Residential - Full Home">Residential - Full Home</option>
            <option value="Residential - Single Room">Residential - Single Room</option>
            <option value="Commercial">Commercial</option>
            <option value="Other">Other</option>
          </select>
          {errors.projectType && <span className="text-red-500 text-xs">{errors.projectType}</span>}
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
            Budget Range <span className="text-[var(--color-blueprint-line)]">*</span>
          </label>
          <select 
            id="budget" 
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={cn(
              "bg-transparent border-b pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none appearance-none cursor-pointer",
              errors.budget ? "border-red-500" : "border-[var(--color-ink)]/20"
            )}
          >
            <option value="" disabled>Select...</option>
            <option value="< ₹40L">Less than ₹40 Lakhs</option>
            <option value="₹40L - ₹1.2Cr">₹40 Lakhs - ₹1.2 Crores</option>
            <option value="₹1.2Cr - ₹4Cr">₹1.2 Crores - ₹4 Crores</option>
            <option value="> ₹4Cr">More than ₹4 Crores</option>
          </select>
          {errors.budget && <span className="text-red-500 text-xs">{errors.budget}</span>}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-ink)]/70">
          Project Details
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="bg-transparent border-b border-[var(--color-ink)]/20 pb-2 px-0 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-sans rounded-none resize-none"
          placeholder="Tell us about your space, timeline, and goals..."
        />
      </div>

      <Button type="submit" variant="primary" disabled={status === "submitting"} className="mt-4 w-full">
        {status === "submitting" ? "Sending..." : "Submit Inquiry"}
      </Button>

    </form>
  );
}
