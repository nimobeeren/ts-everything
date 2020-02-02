import '@testing-library/jest-dom';

// Mock fetch for Apollo client
window.fetch = () => Promise.resolve(new Response());
