"use client";

import { useEffect, useState } from "react";
import useStore from "../hooks/useStore";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "react-feather";

export default function CreatePage() {
    const router = useRouter();
    const isLoggedIn = useStore((state) => state.accessToken);
    const authChecked = useStore((state) => state.authChecked);

    useEffect(() => {
        if (isLoggedIn === null && authChecked)
            router.push("/login?next=create");
    }, []);

    const [ingredientVal, setIngredientVal] = useState("");
    const [amountVal, setAmountVal] = useState("");
    const [ingredientsList, setIngredientsList] = useState<string[]>([]);

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

    return (
        <main className="mx-auto my-10 flex w-[90vw] flex-col items-center justify-start overflow-y-auto rounded bg-white">
            <form className="mt-4 flex w-full flex-col space-y-6 p-4 pb-10 sm:w-[80%]">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        نام غذا
                    </label>
                    <input
                        type="text"
                        className=" rounded-sm border-2 px-2 py-1"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        زمان پخت
                    </label>
                    <input
                        type="text"
                        className=" rounded-sm border-2 px-2 py-1"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        برای چند نفر
                    </label>
                    <input
                        type="text"
                        className=" rounded-sm border-2 px-2 py-1"
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
                        className=" rounded-sm border-2 px-2 py-1"
                        rows={5}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="">
                        تصویر غذا
                    </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className=" rounded-sm border-2 px-2 py-1"
                    />
                </div>
            </form>
        </main>
    );
}
