import ShoesSlider from './ShoesSlider';

const ShoesHomeSlider = ({ mainSlider }) => {
  const ShoesMainFilter = mainSlider?.filter((el) => el.type === 'shoes');
  const hasSlides = ShoesMainFilter?.some((item) => Array.isArray(item?.slides) && item.slides.length > 0);

  if (!hasSlides) {
    return null;
  }

  return (
    <section className='pt-0 overflow-hidden home-section home-section-3'>
      <div>
        <div className='banner-slider box-arrow'>
          <ShoesSlider ShoesMainFilter={ShoesMainFilter} />
        </div>
      </div>
    </section>
  );
};
export default ShoesHomeSlider;
