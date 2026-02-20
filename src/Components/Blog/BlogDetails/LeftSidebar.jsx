import React from 'react';
import { Col } from 'reactstrap';
import LeftPopularCard from './LeftPopularCard';

const LeftSidebar = () => {
  return (
    <Col lg='3' md='4'>
      <div className='left-side'>
        <LeftPopularCard />
      </div>
    </Col>
  );
};

export default LeftSidebar;
