import { Col, Container, Row } from "reactstrap";
import { LatestProduct, OurCollection } from "@/Constant";
import SectionHeader from "../../Element/SectionHeader";
import SliderProductCard from "./SliderProductCard";

const ShoesLatestProduct = ({ products = [] }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <section className="ratio_asos">
      <Container fluid={true} className="p-sm-0">
        <Row className="m-0">
          <Col sm="12" className="p-0">
            <SectionHeader title={LatestProduct} subTitle={OurCollection} />
            <SliderProductCard products={products} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ShoesLatestProduct;
