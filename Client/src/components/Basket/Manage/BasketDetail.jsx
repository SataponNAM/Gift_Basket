import { useGetGiftBasketQuery } from "../../../slices/giftBasketApiSlice";

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