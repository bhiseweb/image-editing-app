import * as enzyme from 'enzyme';
const EnzymeAdapter = require ('enzyme-adapter-react-16') ;

(enzyme as any).configure({ adapter: new EnzymeAdapter() });