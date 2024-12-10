import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        className="inline-block rounded-xl bg-neutral-800 px-10 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
    >
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;