import PropTypes from 'prop-types';

const Section = ({
    className,
    id,
    customPaddings,
    children
}) => {
  return (
    <div 
        id={id}
        className={`relative ${
            customPaddings || 
            `py-10 lg:py-16 xl:py-20 ${className || ""}`
        }`}
    >
        {children}
    </div>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  customPaddings: PropTypes.string,
  children: PropTypes.node.isRequired
};

Section.defaultProps = {
  className: '',
  id: null,
  customPaddings: '',
};

export default Section;