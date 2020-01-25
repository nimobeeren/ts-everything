import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

// Mock fetch for Apollo client
window.fetch = () => Promise.resolve(new Response());
