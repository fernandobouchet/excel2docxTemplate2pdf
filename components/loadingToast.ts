import { toast } from "sonner";

const LoadingToast = async (
  id: string,
  promise: Promise<any>,
  loading: string,
  success: string,
  error: string
) => {
  toast.loading(loading, { id: id });

  try {
    const result = await promise;
    toast.success(success, { id: id });
    return result;
  } catch (e: any) {
    toast.error(error, { id: id });
    throw new Error(e);
  }
};

export { LoadingToast };
