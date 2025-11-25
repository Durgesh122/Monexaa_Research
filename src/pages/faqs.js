import React from 'react';
import FAQ from '../components/FAQ'; // Assuming there is an FAQ component based on file list

const FAQs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4">Frequently Asked Questions</h1>
      <FAQ />
    </div>
  );
};

export default FAQs;
