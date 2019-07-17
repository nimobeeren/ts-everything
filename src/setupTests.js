const { configure: configureEnzyme } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configureEnzyme({ adapter: new Adapter() });
