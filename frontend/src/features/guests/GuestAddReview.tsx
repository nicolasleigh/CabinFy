import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useCreateReview } from "./useCreateReview";
// import { useAddReviewModal } from "../../hooks";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function GuestAddReview({ setOpen }) {
  const createArray = (count) => {
    return new Array(count).fill("");
  };

  const ratings = createArray(5);
  const { cabinId } = useParams();

  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const loggedIn = !!queryClient.getQueryData(["guest"]);

  const handleChange = ({ target }) => {
    setContent(target.value);
  };

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const { createReview, isLoading } = useCreateReview();
  // const { setSubmitted } = useAddReviewModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRatings.length) {
      toast.error("Please select a rating");
      return;
    }
    if (!content) {
      toast.error("Please enter review");
      return;
    }
    if (!loggedIn) {
      toast.error("Please log in");
      return;
    }
    const data = {
      rating: selectedRatings.length,
      comment: content,
      cabinId,
    };
    createReview(data);
    // setSubmitted(true);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <div className='space-y-1'>
        <Label>{t("ratingAddReview")}</Label>
        <div className='flex relative'>
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className='flex absolute'>
            <StarsFill ratings={selectedRatings} onMouseEnter={handleMouseEnter} />
          </div>
        </div>
      </div>

      <div className='space-y-1'>
        <Label>{t("reviewAddReview")}</Label>
        <Textarea value={content} className='h-32' onChange={handleChange} />
      </div>

      <Button type='submit' className='bg-cRed-500 hover:bg-cRed-600'>
        {t("submitButton")}
      </Button>
    </form>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return <AiOutlineStar onMouseEnter={() => onMouseEnter(index)} key={index} size={20} className='text-cRed-500' />;
  });
};

const StarsFill = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return <AiFillStar onMouseEnter={() => onMouseEnter(index)} key={index} size={20} className='text-cRed-500' />;
  });
};
