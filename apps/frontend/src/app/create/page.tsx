"use client";

import { useEffect, useState } from "react";
import useStore from "../hooks/useStore";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "react-feather";
import { CreateFoodDto, createFoodSchema } from "backend";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthError } from "../types/auth";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertBox, { MessageType } from "../components/AlertBox";
import Spinner from "../components/LoadingSpinner";

interface CleanCreateFoodDto extends CreateFoodDto {
    food_picture: any;
}

export default function CreatePage() {
    const accessToken = useStore((state) => state.accessToken);
    useEffect(() => {
        if (accessToken?.length === 0) router.push("/login?next=create");
    }, [accessToken]);

    const router = useRouter();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<MessageType>("error");

    const [ingredientVal, setIngredientVal] = useState("");
    const [amountVal, setAmountVal] = useState("");
    const [ingredientsList, setIngredientsList] = useState<string[]>([]);

    useEffect(() => {
        setValue("ingredients", ingredientsList.join("\n"));
    }, [ingredientsList]);

    const addIngredient = () => {
        if (amountVal && ingredientVal) {
            setIngredientsList([
                ...ingredientsList,
                `${ingredientVal}: ${amountVal}`,
            ]);
            setIngredientVal("");
            setAmountVal("");
        }
    };

    const deleteIngredient = (i: number) => {
        const newList = [...ingredientsList];
        newList.splice(i, 1);
        setIngredientsList([...newList]);
    };

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CleanCreateFoodDto>({
        resolver: zodResolver(createFoodSchema),
    });
    const onSubmit: SubmitHandler<CleanCreateFoodDto> = () => {
        setMessage("");
        const data = getValues();

        const formData = new FormData();
        let k: keyof CleanCreateFoodDto;
        for (k in data) {
            if (k === "food_picture") formData.append(k, data[k][0] as any);
            else {
                formData.append(k, data[k] as unknown as Blob);
            }
        }
        mutation.mutate(formData as unknown as CleanCreateFoodDto);
    };

    const formErrorHandler = (error: FieldErrors) => {
        window.scrollTo(0, 0);
        let errorMessage = "";
        Object.entries(error).forEach(
            ([key, value]) => (errorMessage += `${key}: ${value?.message}\n`)
        );
        setMessageType("error");
        setMessage(errorMessage);
    };

    const privateAxios = usePrivateAxios();
    const mutation = useMutation<any, AxiosError<AuthError>, CreateFoodDto>(
        (formData) => privateAxios.post("/foods", formData),
        {
            onSuccess() {
                window.scrollTo(0, 0);
                setMessageType("success");
                setMessage("دستور پخت شما با موفقیت ثبت شد.");
                reset();
                setIngredientsList([]);
            },
            onError(error) {
                window.scrollTo(0, 0);
                setMessage(error.response?.data.message || "خطایی رخ داده است");
                setMessageType("error");
            },
        }
    );

    return (
        <main className="mx-auto my-5 flex w-[90vw] flex-col items-center justify-start overflow-y-auto rounded ">
            {message && (
                <AlertBox message={message} messageType={messageType} />
            )}
            <form
                className="mt-4 flex w-full flex-col space-y-6 rounded bg-white p-4 pb-10 sm:w-[80%]"
                onSubmit={handleSubmit(onSubmit, formErrorHandler)}
            >
                <div className="mt-4 flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        نام غذا
                    </label>
                    <input
                        required
                        type="text"
                        className=" rounded-sm border-2 px-2 py-1"
                        {...register("food_name")}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        زمان پخت (دقیقه)
                    </label>
                    <input
                        required
                        type="number"
                        className=" rounded-sm border-2 px-2 py-1"
                        {...register("cooking_duration", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        برای چند نفر
                    </label>
                    <input
                        required
                        type="number"
                        className=" rounded-sm border-2 px-2 py-1"
                        {...register("serves", { valueAsNumber: true })}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        مواد اولیه
                    </label>
                    <div className="flex w-full max-w-full flex-col  sm:flex-row sm:items-center">
                        <input
                            type="text"
                            className="mt-3 flex-1 rounded-sm border-2  px-2 py-1 sm:mx-2 sm:mt-0 "
                            placeholder="ماده اولیه"
                            value={ingredientVal}
                            onChange={(event) =>
                                setIngredientVal(event.target.value)
                            }
                        />
                        <input
                            type="text"
                            className="mt-3 flex-1 rounded-sm border-2 px-2 py-1 sm:mx-2 sm:mt-0"
                            placeholder="مقدار"
                            value={amountVal}
                            onChange={(event) =>
                                setAmountVal(event.target.value)
                            }
                        />
                        <Plus
                            className="hidden w-10 text-green-700 sm:block"
                            onClick={() => {
                                addIngredient();
                            }}
                        />
                        <button
                            type="button"
                            className="mt-2 rounded bg-lime-500 py-2 sm:hidden"
                            onClick={() => {
                                addIngredient();
                            }}
                        >
                            اضافه
                        </button>
                    </div>
                    <input
                        type="hidden"
                        required
                        {...register("ingredients")}
                    />
                    {ingredientsList.length > 0 && (
                        <ul className="flex w-full flex-col rounded bg-gray-200 p-4 text-gray-800">
                            {ingredientsList.map((el, i) => (
                                <li
                                    className={`my-2 flex items-center justify-between pb-4 ${
                                        i !== ingredientsList.length - 1 &&
                                        "border-b border-gray-400"
                                    }`}
                                    key={i}
                                >
                                    <span>{el}</span>
                                    <Trash2
                                        className="w-5 text-red-600"
                                        onClick={() => deleteIngredient(i)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        دستور پخت
                    </label>
                    <textarea
                        required
                        className=" rounded-sm border-2 px-2 py-1"
                        rows={5}
                        {...register("food_recipe")}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        تصویر غذا
                    </label>
                    <input
                        required
                        {...register("food_picture")}
                        type="file"
                        accept="image/png, image/jpeg"
                        className=" rounded-sm border-2 px-2 py-1"
                    />
                </div>
                <div className="flex sm:justify-end">
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className={`flex flex-1 cursor-pointer items-center justify-center rounded bg-green-500 px-4 py-2 disabled:cursor-progress disabled:bg-green-300 sm:flex-none`}
                    >
                        ثبت
                        {mutation.isLoading && <Spinner />}
                    </button>
                </div>
            </form>
        </main>
    );
}
