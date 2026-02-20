import { Col, Container, Row } from "reactstrap";
import { NewArrival, OurCollection } from "@/Constant";
import SectionHeader from "../../Element/SectionHeader";
import ShoesSliderCard from "./ShoesSliderCard";

const ShoesNewArrival = ({ products = [] }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <section className="ratio_asos">
      <Container>
        <Row className="m-0">
          <Col sm="12" className="p-0">
            <SectionHeader title={NewArrival} subTitle={OurCollection} />
            <ShoesSliderCard products={products} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ShoesNewArrival;
