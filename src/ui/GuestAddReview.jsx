import { useState } from 'react';
import Form from './Form';
import FormRowVertical from './FormRowVertical';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import Button from './Button';
import toast from 'react-hot-toast';
import { useCreateReview } from '../features/guests/useCreateReview';
import { useParams } from 'react-router-dom';
import { useAddReviewModal } from '../hooks';

const StarBox = styled.div`
  display: flex;
  cursor: pointer;

  .fill {
    position: absolute;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  height: 12rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  resize: none;
  background-color: var(--color-grey-100);
  &:focus {
    outline: none;
    border: 1px solid #333;
  }
`;

export default function GuestAddReview() {
  const createArray = (count) => {
    return new Array(count).fill('');
  };

  const ratings = createArray(5);
  const { cabinId } = useParams();

  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState('');
  const handleChange = ({ target }) => {
    setContent(target.value);
  };

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const { createReview, isLoading } = useCreateReview();
  const { setSubmitted } = useAddReviewModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRatings.length) {
      toast.error('Please select a rating');
      return;
    }
    const data = {
      rating: selectedRatings.length,
      comment: content,
      cabinId,
    };
    createReview(data);
    setSubmitted(true);
  };

  return (
    <Form type='modal-small' onSubmit={handleSubmit}>
      <FormRowVertical label='Rating'>
        <StarBox>
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className='fill'>
            <StarsFill
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </StarBox>
      </FormRowVertical>

      <FormRowVertical label='Review'>
        <Textarea value={content} onChange={handleChange}></Textarea>
      </FormRowVertical>

      <FormRowVertical label=''>
        <Button type='submit' variation='gradient'>
          Submit
        </Button>
      </FormRowVertical>
    </Form>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiOutlineStar
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={20}
      />
    );
  });
};

const StarsFill = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiFillStar
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={20}
      />
    );
  });
};
