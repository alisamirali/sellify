import { parseAsBoolean, useQueryState } from "nuqs";

export const useCheckoutStates = () => {
  const [success, setSuccess] = useQueryState(
    "success",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    })
  );
  const [cancel, setCancel] = useQueryState(
    "cancel",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    })
  );
  return { success, setSuccess, cancel, setCancel };
};
