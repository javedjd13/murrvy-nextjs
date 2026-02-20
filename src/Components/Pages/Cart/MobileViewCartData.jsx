import { Col, Input, Row } from 'reactstrap';

const MobileViewCartData = ({ elem, removeProduct, handleQtyChange, quantityMap, itemKey }) => {
  const qtyValue = quantityMap?.[itemKey]?.qty ? quantityMap[itemKey].qty : 1;

  return (
    <td>
      <a>{elem.name}</a>
      <Row className='mobile-cart-content'>
        <Col>
          <div className='qty-box'>
            <div className='input-group'>
              <Input
                type='number'
                name='quantity'
                value={qtyValue}
                min={1}
                className='form-control input-number'
                onChange={(e) => handleQtyChange(e.target.value, itemKey, elem?.price)}
              />
            </div>
          </div>
        </Col>
        <Col>
          <h2>{elem.price}</h2>
        </Col>
        <Col>
          <h2 className='td-color'>
            <a onClick={() => removeProduct(elem)}>
              <i className='fas fa-times'></i>
            </a>
          </h2>
        </Col>
      </Row>
    </td>
  );
};

export default MobileViewCartData;
