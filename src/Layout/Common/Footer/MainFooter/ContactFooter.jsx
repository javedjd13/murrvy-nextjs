import { Col } from 'reactstrap';
import { Address, Email, phone, VoxoMail, mobileno, ActualAddress, CommonPath } from '@/Constant';
import Image from 'next/image';

const ContactFooter = () => {
  return (
    <>
      <Col xl='3' lg='3' md='6'>
        <div className='footer-contact'>
          <div className='brand-logo'>
            <a href='#javascript' className='footer-logo'>
              <Image width={68} height={25} src={`${CommonPath}/murrvy-logo.png`} className='img-fluid no-dark-invert' alt='logo' />
            </a>
          </div>
          <ul className='contact-lists'>
            <li>
              <span>
                <b>{phone}:</b>
                <span className='font-light'>{mobileno}</span>
              </span>
            </li>
            <li>
              <span>
                <b>{Address}:</b>
                <span className='font-light'> {ActualAddress}</span>
              </span>
            </li>
            <li>
              <span>
                <b>{Email}:</b>
                <span className='font-light'> {VoxoMail}</span>
              </span>
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
};
export default ContactFooter;
