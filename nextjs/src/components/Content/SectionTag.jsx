import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const SectionTag = ({ alias, children, className }) => (
  <Link href={`/section?alias=${alias}`} as={`/section/${alias}`}>
    <a className={className}>{children}</a>
  </Link>
);

SectionTag.propTypes = {
  className: PropTypes.string,
  alias: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

SectionTag.defaultProps = {
  className: null,
};

export default SectionTag;
