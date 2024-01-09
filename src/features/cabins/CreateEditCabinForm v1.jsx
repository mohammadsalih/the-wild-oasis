import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { createCabin as createCabinApi } from "../../services/apiCabins";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({cabinToEdit}) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("new cabin added successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      reset();
    },
    onError: (err) => {
      console.log(`we could not add the cabin , error : ${err}`);

      toast.error("we could not add the cabin");
    },
  });

  const { errors } = formState;

  const onSubmit = function (newCabin) {
    createCabin({ ...newCabin, image: newCabin.image[0] });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at list one",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 75,
              message: "Price should be at list 75 dollars",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              getValues().regularPrice >= parseInt(value) + 25 ||
              `Discount should be less then the price by 25 dollars witch is ${
                getValues().regularPrice
              } dollars`,
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label="Description for website"
      >
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label="Cabin photo<">
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isCreating} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? <SpinnerMini /> : "add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
