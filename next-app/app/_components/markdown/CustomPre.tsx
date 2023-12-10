import { Components } from 'react-markdown';

const CustomPre: Components['pre'] = (props) => {
  return <pre className="bg-transparent p-0 m-0">{props.children}</pre>;
};

export default CustomPre;
