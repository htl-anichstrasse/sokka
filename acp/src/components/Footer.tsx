import React, { FunctionComponent } from 'react';

interface FooterProps {
    year: number;
}

const Footer: FunctionComponent<FooterProps> = ({ year }) =>
    <span className="text-muted">Copyright © {year} Sokka Project</span>;

export default Footer;