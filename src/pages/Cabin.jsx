import styled from 'styled-components';
import { IoMdStar } from 'react-icons/io';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IoWifiOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { TbWashMachine } from 'react-icons/tb';
import { BiFridge } from 'react-icons/bi';
import { TbAirConditioning } from 'react-icons/tb';
import { TbIroning1 } from 'react-icons/tb';
import { PiFirstAidKit } from 'react-icons/pi';
import { PiFirstAidKitBold } from 'react-icons/pi';
import { CgScreen } from 'react-icons/cg';
import { PiFlowerTulip } from 'react-icons/pi';
import { PiFlowerTulipBold } from 'react-icons/pi';
import { IoWifiSharp } from 'react-icons/io5';
import DayPick from '../ui/DayPick';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import GuestsReviews from '../ui/GuestsReviews';
import { useCreateBooking } from '../features/bookings/useCreateBooking';
import GuestSignup from './GuestSignup';
import GuestLogin from './GuestLogin';
import { useQueryClient } from '@tanstack/react-query';
import { imageBaseUrl } from '../App';
import { useCabin } from '../features/cabins/useCabin';
import { useSettings } from '../features/settings/useSettings';
import { differenceInDays, set } from 'date-fns';
import { formatCurrency } from '../utils/helpers';

const ImageSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: var(--color-grey-100);
`;

const ImageLeft = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-xl) 0 0 var(--border-radius-xl);
`;
const ImageRight = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.6rem;
  border-radius: 0 var(--border-radius-xl) var(--border-radius-xl) 0;
  overflow: hidden;
`;
const ImageRightCell = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1.6rem; */
  padding: 2rem 0;
  background-color: var(--color-grey-100);

  & div:first-child {
    font-size: 2.6rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 5rem;
`;

const TextSection = styled.div``;

const FormSection = styled.div``;

const GuestsFavorite = styled.div`
  display: flex;
  padding: 2rem 2.3rem;
  gap: 2rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-around;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-grey-300);
`;

const ReviewLayout = styled(Link)`
  display: flex;
  gap: 0.6rem;
`;

const Favorite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-red-700);
`;

const Star = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  border-right: 1px solid var(--color-grey-200);

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;
    }
    &:last-child {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
    }
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;

  > * {
    &:first-child {
      font-size: 2.2rem;
      font-weight: 600;
    }
    &:last-child {
      font-size: 1.2rem;
      text-decoration: underline;
    }
  }
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Featured = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
  padding: 2rem 2.3rem;

  > * {
    &:first-child {
      grid-column: 1 / -1;
      font-size: 2rem;
      padding: 1rem 0;
    }
  }
`;

const IconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-300);
  padding: 2rem 2.3rem;
  border-radius: var(--border-radius-xl);
  margin-top: 2rem;
`;

const Button = styled.button`
  border-radius: 50%;
  display: block;
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-grey-400);

  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px solid var(--color-grey-600);
  }
  &:disabled {
    border: 1px solid var(--color-grey-300);
    color: var(--color-grey-300);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  & {
    .number {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const GuestsNumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const Label = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

const BreakfastBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  & {
    .yes,
    .no {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }
  }
`;

const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;
`;

const TotalPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;

  div {
    font-size: 2rem;
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }

  .beforeDiscount {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
  }
`;

const BookingBox = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  padding: 2rem 3rem;
`;

const Booking = styled.button`
  display: block;
  width: 100%;
  padding: 1.6rem 0;
  border-radius: var(--border-radius-lg);
  border: none;
  background: rgb(195, 34, 34);
  background: linear-gradient(
    275deg,
    #d72727ec 0%,
    rgba(253, 45, 96, 0.9262298669467787) 100%
  );
  color: var(--color-grey-100);
`;

const ReviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 2rem;
  padding: 2rem 2.3rem;
`;
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

const ReviewBtn = styled.button`
  display: block;
  text-decoration: underline;
  border: none;
  background: none;
  padding: 0 1rem;

  &:focus {
    outline: none;
  }
`;

export default function Cabin() {
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [breakfast, setBreakfast] = useState(true);
  const [selectedRange, setSelectedRange] = useState();
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
  const { cabin, isLoading: isLoadingCabin } = useCabin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { image, images, bedroom, discount, name, regularPrice } = cabin || {
    images: [],
  };
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const numOfNights =
    differenceInDays(selectedRange?.to, selectedRange?.from) + 1;

  useEffect(() => {
    setTotalPrice(0);
    setPriceBeforeDiscount(0);
    if (numOfNights) {
      setTotalPrice(
        regularPrice * numOfNights * (1 - discount / 100) +
          (breakfast ? breakfastPrice : 0) * guestsNumber
      );
      setPriceBeforeDiscount(
        regularPrice * numOfNights +
          (breakfast ? breakfastPrice : 0) * guestsNumber
      );
    }
  }, [
    numOfNights,
    guestsNumber,
    breakfast,
    breakfastPrice,
    discount,
    regularPrice,
  ]);

  const { createBooking, isLoading } = useCreateBooking();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking({
      guestsNumber,
      breakfast,
      selectedRange,
      numOfNights,
      totalPrice,
      extrasPrice: breakfast ? breakfastPrice * guestsNumber : 0,
      cabinPrice: regularPrice * numOfNights,
      cabinId: cabin.id,
      isPaid: false,
      status: 'unconfirmed',
    });
  };
  return (
    <>
      <GuestSignup />
      <GuestLogin />

      <ImageSection>
        <ImageLeft src={imageBaseUrl + image} />
        <ImageRight>
          <ImageRightCell src={imageBaseUrl + images[0]?.fileName} />
          <ImageRightCell src={imageBaseUrl + images[1]?.fileName} />
          <ImageRightCell src={imageBaseUrl + images[2]?.fileName} />
          <ImageRightCell src={imageBaseUrl + images[3]?.fileName} />
        </ImageRight>
      </ImageSection>

      <Container>
        <TextSection>
          <Location>
            <div>Located in: ArrowHead, California</div>

            <div>
              {bedroom}{' '}
              {Number(bedroom) === 1 ? (
                <span>bedroom</span>
              ) : (
                <span>bedrooms</span>
              )}{' '}
              {Boolean(discount) && <span> &bull; {discount}% discount</span>}{' '}
              &bull; {formatCurrency(regularPrice)} night
            </div>
          </Location>

          <GuestsFavorite>
            <Favorite>
              <span>🎉</span>
              <span>Guests favorite</span>
            </Favorite>
            <Text>One of the most loved cabins on our website</Text>
            <Modal>
              <Modal.Open opens='reviews'>
                <ReviewLayout>
                  <Star>
                    <p>5.0</p>
                    <p>
                      <IoMdStar />
                      <IoMdStar />
                      <IoMdStar />
                      <IoMdStar />
                      <IoMdStar />
                    </p>
                  </Star>
                  <Review>
                    <p>27</p>
                    <p>Reviews</p>
                  </Review>
                </ReviewLayout>
              </Modal.Open>
              <Modal.Window name='reviews'>
                <GuestsReviews />
              </Modal.Window>
            </Modal>
          </GuestsFavorite>
          <Featured>
            <p>What this cabin offer:</p>
            <IconWithText>
              <IoWifiSharp />
              <span>Wifi</span>
            </IconWithText>
            <IconWithText>
              <LuBath />
              <span>Hot tub - open 24 hours</span>
            </IconWithText>
            <IconWithText>
              <TbToolsKitchen2 />
              <span>Kitchen</span>
            </IconWithText>
            <IconWithText>
              <TbWashMachine />
              <span>Free washer machine</span>
            </IconWithText>
            <IconWithText>
              <BiFridge />
              <span>Fridge available</span>
            </IconWithText>
            <IconWithText>
              <TbAirConditioning />
              <span>Air conditioning</span>
            </IconWithText>
            <IconWithText>
              <TbIroning1 />
              <span>Iron available</span>
            </IconWithText>
            <IconWithText>
              <PiFirstAidKitBold />
              <span>First aid kit</span>
            </IconWithText>
            <IconWithText>
              <CgScreen />
              <span>32-Inch TV</span>
            </IconWithText>
            <IconWithText>
              <PiFlowerTulipBold />
              <span>Garden view</span>
            </IconWithText>
          </Featured>
          <ReviewBox>
            <ReviewItem>
              <Figure>
                <div>TH</div>
                <figcaption>
                  <p className='name'>Hanna</p>
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
                Such a lovely stay! The space is absolutely epic space to have
                my quaint little bachelorette. Perfect honestly.
              </div>
            </ReviewItem>
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
                Absolutely lovely. Felt like a cozy dream the whole time, such a
                rare experience, we loved it
              </div>
            </ReviewItem>
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
                Absolutely lovely. Felt like a cozy dream the whole time, such a
                rare experience, we loved it
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
                Absolutely lovely. Felt like a cozy dream the whole time, such a
                rare experience, we loved it
              </div>
            </ReviewItem>
          </ReviewBox>
          <Modal>
            <Modal.Open opens='reviews'>
              <ReviewBtn>Sell all reviews</ReviewBtn>
            </Modal.Open>
            <Modal.Window name='reviews'>
              <GuestsReviews />
            </Modal.Window>
          </Modal>
        </TextSection>
        <FormSection>
          <Form onSubmit={handleSubmit}>
            <DayPick
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              fromValue={fromValue}
              setFromValue={setFromValue}
              toValue={toValue}
              setToValue={setToValue}
              maxBookingLength={maxBookingLength}
            />
            <GuestsNumberBox>
              <Label>Number of Guests</Label>
              <ButtonGroup>
                <Button
                  type='button'
                  onClick={() => setGuestsNumber((cur) => cur - 1)}
                  disabled={guestsNumber === 1}
                >
                  -
                </Button>
                <span className='number'>{guestsNumber}</span>
                <Button
                  type='button'
                  onClick={() => setGuestsNumber((cur) => cur + 1)}
                  disabled={guestsNumber === maxGuestsPerBooking}
                >
                  +
                </Button>
              </ButtonGroup>
            </GuestsNumberBox>
            <BreakfastBox>
              <Label>Want breakfast?</Label>
              <CheckboxGroup>
                <div className='yes'>
                  <label htmlFor='yes'>Yes</label>
                  <Checkbox
                    id='yes'
                    type='checkbox'
                    onClick={() => setBreakfast(true)}
                    checked={breakfast}
                    readOnly
                  />
                </div>
                <div className='no'>
                  <label htmlFor='no'>No</label>
                  <Checkbox
                    id='no'
                    type='checkbox'
                    onClick={() => setBreakfast(false)}
                    checked={!breakfast}
                    readOnly
                  />
                </div>
              </CheckboxGroup>
            </BreakfastBox>
            <TotalPriceBox>
              <Label>Total Price</Label>
              <div className='beforeDiscount'>
                {Boolean(discount) && formatCurrency(priceBeforeDiscount)}
              </div>
              <div>{formatCurrency(totalPrice)}</div>
            </TotalPriceBox>
            <BookingBox>
              <Booking>Booking</Booking>
            </BookingBox>
          </Form>
        </FormSection>
      </Container>
    </>
  );
}
