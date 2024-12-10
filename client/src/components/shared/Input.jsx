import PropTypes from 'prop-types';

const Input = ({ placeholder, name, value, onChange }) => (
  <div className='p-3'>
    <input
      className="bg-[#fdf5df] border-b-2 border-black text-gray-600 text-l font-open font-semibold block w-full p-2.5 hover:border-[#0000005c] focus:outline-none"
      placeholder={placeholder}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
