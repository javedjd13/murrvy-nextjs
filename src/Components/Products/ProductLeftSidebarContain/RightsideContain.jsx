import { getAPIData } from '@/Utils';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import AutoFadeSlider from '../Common/AutoFadeSlider';
import ProductDetails from '../ProductBundle/ProductDetails';
import ProductFilterButton from './ProductFilterButton';

const RightsideContain = ({id}) => {
  const [singleProduct, setSingleProduct] = useState([]);
  const resolvedId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const types = ['product'];
    types.forEach((type) => {
      getAPIData(`/api/${type}/${resolvedId ? resolvedId : "1"}`).then((res) => {
        type === 'product' && setSingleProduct(res?.data);
      });
    });
  }, [resolvedId]);
  return (
    <Col lg='9' xs='12'>
      <ProductFilterButton />
      <div className='details-items'>
        <Row className='g-4'>
          <Col md='6'>
            <AutoFadeSlider singleProduct={singleProduct} id={resolvedId} />
          </Col>
          <Col md='6'>
            <ProductDetails singleProduct={singleProduct} id={resolvedId} />
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default RightsideContain;
