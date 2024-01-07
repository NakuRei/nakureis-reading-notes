import { Components } from 'react-markdown';

const CustomPre: Components['pre'] = (props) => {
  return (
    <pre className="max-md:max-w-none lg:max-w-md xl:max-w-none bg-transparent p-0 m-0">
      {props.children}
    </pre>
  );
};

export default CustomPre;
