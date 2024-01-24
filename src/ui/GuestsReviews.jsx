import { IoMdStar } from 'react-icons/io';
import styled from 'styled-components';

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .review {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.4rem;
  }
`;

const Figure = styled.figure`
  display: flex;
  align-items: center;
  gap: 2rem;

  div {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: var(--color-grey-900);
    color: var(--color-grey-100);
    text-align: center;
    vertical-align: middle;
    line-height: 5rem;
  }

  figcaption {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 0.4rem;

    .name {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  .star {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function GuestsReviews() {
  return (
    <Layout>
      <ReviewItem>
        <Figure>
          <div>T</div>
          <figcaption>
            <p className='name'>Trevor</p>
            <p className='star'>
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
            </p>
          </figcaption>
        </Figure>
        <div className='review'>
          Absolutely lovely. Felt like a cozy dream the whole time, such a rare
          experience, we loved it
        </div>
      </ReviewItem>
      <ReviewItem>
        <Figure>
          <div>H</div>
          <figcaption>
            <p className='name'>Trevor</p>
            <p className='star'>
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
            </p>
          </figcaption>
        </Figure>
        <div className='review'>
          Absolutely lovely. Felt like a cozy dream the whole time, such a rare
          experience, we loved it
        </div>
      </ReviewItem>
    </Layout>
  );
}
