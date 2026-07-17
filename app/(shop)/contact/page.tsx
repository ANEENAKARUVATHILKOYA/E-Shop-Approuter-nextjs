"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your inquiry placeholder message has been submitted successfully.");
  };

  return (
    <div className="space-y-12 py-4 animate-in fade-in duration-300">
      {/* Header Context */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Contact Support</h1>
        <p className="mt-2 text-sm text-gray-500">
          Have questions regarding order status, shipping rules, or general store items? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Contact Metadata Columns */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">Support Desk</h4>
              <p className="text-xs text-blue-600 font-medium mt-1">team@shopnext.com</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Expect a dynamic response within 24 hours.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">Customer Hotline</h4>
              <p className="text-xs text-blue-600 font-medium mt-1">+1 (800) 555-0199</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Available Mon - Fri, 9:00 AM - 5:00 PM.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">Corporate Center</h4>
              <p className="text-xs text-gray-600 mt-1">456 Digital Commerce Pkwy</p>
              <p className="text-xs text-gray-400">Banglur,India</p>
            </div>
          </div>
        </div>

        {/* Input Form Submission Container Block */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Inquiry Subject</label>
              <input
                type="text"
                required
                placeholder="Order tracking, product details, etc."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Detailed Message</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your issue or query..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-98"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}