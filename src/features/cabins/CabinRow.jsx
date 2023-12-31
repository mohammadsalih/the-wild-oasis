import styled from "styled-components";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { HiEllipsisVertical } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";

import ButtonIcon from "../../ui/ButtonIcon";
import Spinner from "../../ui/Spinner";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    id: cabinId,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabinFn } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("cabin got deleted successfully ");
    },
    onError: (err) => {
      console.log(`we could not delete the cabin , error : ${err}`);

      toast.error("we could not delete the cabin");
    },
  });

  if (isDeleting) return <Spinner />;

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{regularPrice}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <ButtonIcon onClick={() => deleteCabinFn(cabinId)}>
        <HiEllipsisVertical />
      </ButtonIcon>
    </TableRow>
  );
}

export default CabinRow;
