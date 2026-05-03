"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { LOCATIONS } from "@/lib/data/misc";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { ContactFormData } from "@/types";

const SUBJECTS = [
  "Booking Inquiry",
  "Service Information",
  "Membership",
  "Gift Cards",
  "Corporate Wellness",
  "Press & Media",
  "General Inquiry",
];

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0].id);
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    locationId: LOCATIONS[0].id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI simulation — no real submission
    setSubmitted(true);
  };

  const currentLocation = LOCATIONS.find((l) => l.id === activeLocation) ?? LOCATIONS[0];

  return (
    <>
      {/* Hero */}
      <div className="bg-stone-900 pt-40 pb-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80')` }}
        />
        <div className="container-luxury relative">
          <SectionHeader
            eyebrow="Reach Us"
            heading="We Are Here For You"
            subheading="Our concierge team is available to assist with bookings, inquiries, and everything in between."
            light
          />
        </div>
      </div>

      {/* Locations tabs + map */}
      <section className="bg-stone-800 py-0">
        {/* Location selector */}
        <div className="container-luxury pt-0">
          <div className="flex items-end gap-0 border-b border-stone-700">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc.id)}
                className={`px-6 py-4 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-200 border-b-2 ${
                  activeLocation === loc.id
                    ? "border-gold-500 text-gold-400"
                    : "border-transparent text-stone-500 hover:text-stone-300"
                }`}
              >
                {loc.name.replace("Aurum Star ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Location info + map */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Location details */}
          <div className="container-luxury lg:max-w-none lg:pl-[8vw] lg:pr-16 py-16 space-y-8">
            <div>
              <p className="eyebrow text-gold-500 mb-2">{currentLocation.name}</p>
              <h2 className="font-serif text-3xl text-cream-50 font-light">{currentLocation.city}</h2>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: `${currentLocation.address}, ${currentLocation.city}`,
                },
                { icon: Phone, label: "Phone", value: currentLocation.phone },
                { icon: Mail, label: "Email", value: currentLocation.email },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-stone-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-0.5">{label}</p>
                    <p className="font-sans text-sm text-stone-300">{value}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-stone-600 flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-gold-500" />
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">Hours</p>
                  <div className="space-y-0.5">
                    <p className="font-sans text-sm text-stone-300">
                      Mon–Fri: {currentLocation.hours.weekdays}
                    </p>
                    <p className="font-sans text-sm text-stone-300">
                      Saturday: {currentLocation.hours.saturday}
                    </p>
                    <p className="font-sans text-sm text-stone-300">
                      Sunday: {currentLocation.hours.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative h-80 lg:h-auto min-h-[320px] bg-stone-700 overflow-hidden">
            {/* Decorative map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-2 border-gold-500/30 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                  <MapPin size={24} className="text-gold-500" />
                </div>
                <div>
                  <p className="font-serif text-stone-400 text-lg">{currentLocation.name}</p>
                  <p className="font-sans text-xs text-stone-600 mt-1">{currentLocation.address}</p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentLocation.address + ', ' + currentLocation.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-gold-500/40 text-gold-500 font-sans text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-gold-500/10 transition-colors"
                >
                  Open in Maps
                </a>
              </div>
            </div>
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </section>

      {/* All locations strip */}
      <section className="bg-cream-100/60 py-12 border-y border-stone-200">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc.id)}
                className={`text-left p-5 border transition-all duration-300 ${
                  activeLocation === loc.id
                    ? "border-gold-500/40 bg-white shadow-luxury"
                    : "border-stone-200 bg-white/50 hover:border-stone-300 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-serif text-stone-900">{loc.name}</p>
                  {activeLocation === loc.id && (
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-1.5" />
                  )}
                </div>
                <p className="font-sans text-xs text-stone-400">{loc.address}</p>
                <p className="font-sans text-xs text-stone-400">{loc.city}</p>
                <p className="font-sans text-[10px] text-gold-600 mt-2 tracking-wide">{loc.phone}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section-padding bg-cream-50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left info */}
            <div className="lg:col-span-4 space-y-8">
              <SectionHeader
                eyebrow="Get in Touch"
                heading="Send Us a Message"
                align="left"
              />
              <p className="font-sans text-stone-500 font-light leading-relaxed text-sm">
                Whether you have a question about our services, want to plan a special event, 
                or simply want to say hello — we would love to hear from you. Our team typically 
                responds within two business hours.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: Phone, label: "Call Us", value: "+1 (212) 555-0192" },
                  { icon: Mail, label: "Email", value: "hello@vitaluxhealth.com" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-stone-900 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] tracking-widest uppercase text-stone-400">{label}</p>
                      <p className="font-sans text-sm text-stone-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="border border-stone-200 p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={28} className="text-sage-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900">Message Received</h3>
                  <p className="font-sans text-stone-500 font-light max-w-md mx-auto">
                    Thank you for reaching out. A member of our concierge team will be in 
                    touch within two business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-sans text-xs tracking-widest uppercase text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 border border-stone-200 bg-white p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Phone (Optional)"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (000) 000-0000"
                    />
                    <div className="space-y-1.5">
                      <label className="block font-sans text-xs font-medium tracking-widest uppercase text-stone-600">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-stone-200 px-4 py-3 font-sans text-sm text-stone-800 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-sans text-xs font-medium tracking-widest uppercase text-stone-600">
                      Preferred Location
                    </label>
                    <select
                      name="locationId"
                      value={form.locationId}
                      onChange={handleChange}
                      className="w-full bg-white border border-stone-200 px-4 py-3 font-sans text-sm text-stone-800 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>

                  <Textarea
                    label="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can assist you..."
                    required
                    rows={5}
                  />

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="font-sans text-xs text-stone-400 font-light">
                      We respond within 2 business hours.
                    </p>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send Message
                      <Send size={13} />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
