'use client'
import React, { useState } from 'react';

import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = ({index}:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the skill tracking feature work?",
      answer: "Our skill tracker uses advanced algorithms to monitor your practice time, progress milestones, and skill development patterns. It provides visual analytics to help you understand your growth trajectory."
    },
    {
      question: "Can I set multiple skill goals at once?",
      answer: "Yes, you can set and track multiple skill goals simultaneously. Each goal has its own progress tracking and you can prioritize them as needed."
    },
    {
      question: "How often are progress reports generated?",
      answer: "Progress reports are generated in real-time, with comprehensive weekly summaries. You can also generate custom reports for any time period."
    },
    {
      question: "Is my skill data private and secure?",
      answer: "Absolutely. We use end-to-end encryption for all your data and never share your progress information with third parties."
    },
    {
      question: "Can I share my progress with mentors or friends?",
      answer: "Yes, you can selectively share your progress through secure links or integrated social features while maintaining full control over what's visible."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FiHelpCircle className="mx-auto text-4xl text-green-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-100 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our skill tracking platform and how to maximize your learning potential.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="collapse collapse-plus bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
            >
              <input 
                type="radio" 
                name="faq-accordion" 
                // checked={activeIndex === index}
                // onChange={() => toggleAccordion(index)}
              />
              <div 
                className="collapse-title text-xl font-medium text-gray-100 flex justify-between items-center pr-4 hover:text-indigo-300 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <FiChevronDown className={`transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`} />
              </div>
              <div className="collapse-content">
                <p className="text-gray-300 pt-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="btn btn-outline border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:border-indigo-400 hover:text-gray-900">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;