
import { useGetGiftBasketQuery } from "../../../slices/giftBasketApiSlice";
import { selectCardById } from "../../../slices/cardApiSlice";
import { selectDecorationById } from "../../../slices/decorationApiSlice";
import { selectProductById } from "../../../slices/productApiSlice";
import { selectBasketById } from "../../../slices/basketApiSlice";
import { useSelector } from "react-redux";

import BasketDetailCard from "./BasketDetailCard";

function BasketDetail({ basketId }) {
  let content
  const { giftbasket, isLoading} = useGetGiftBasketQuery("giftBasketList", {
    selectFromResult: ({ data }) => ({
      giftbasket: data?.entities[basketId]
    })
  });


  if (isLoading) {
    content = (<div>Loading...</div>)
  }

  if (!giftbasket) {
    content = (<div>Gift basket not found</div>)
  } else {
    console.log(giftbasket)
    
    content = (<BasketDetailCard giftbasket={giftbasket} />)
  }

  return content
}

export default BasketDetail;