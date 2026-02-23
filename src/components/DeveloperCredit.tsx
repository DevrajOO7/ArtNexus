import React from 'react';
import { Linkedin } from 'lucide-react';

const DeveloperCredit = () => {
    return (
        <a
            href="https://www.linkedin.com/in/devraj007/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 shadow-lg hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 text-sm font-medium text-slate-800 dark:text-slate-200"
        >
            <span>Developed by DEVRAJ &copy; 2025</span>
            <Linkedin className="w-4 h-4 text-[#0A66C2] dark:text-blue-400" />
        </a>
    );
};

export default DeveloperCredit;
