/** 
 * Tailwind CSS configuration for Next.js 15
 * @type {import('tailwindcss').Config} 
 */
module.exports = {
  // Define content sources - ensure we're catching all components
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Default Tailwind theme
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      // Map CSS variables to Tailwind colors
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      // Ensure all theme directives from globals.css are recognized
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
    },
  },
  // Enable dark mode based on class or media query
  darkMode: 'media',
  plugins: [],
}
