import { useSelector } from "react-redux";

const SuggestionBox = ({ elem }) => {
  const { symbol, currencyValue } = useSelector(
    (state) => state.CurrencyReducer,
  );
  return (
    <div className="sugestion-product d-xl-block d-none">
      <h3>{elem.leftTitle}</h3>
      <h6>{elem.leftSubtitle}</h6>
    </div>
  );
};

export default SuggestionBox;
