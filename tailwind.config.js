module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.{html,ts,scss}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
