import Image from "next/image";
import CookingBook from "@/app/asset/cookingBook.jpg";
export default function Home() {
    return (
        <main className="mx-auto mt-4 w-[95%] rounded-md bg-slate-200 p-4">
            <div className="flex w-full flex-col-reverse border-2 border-dotted border-red-800 p-2 sm:flex-row">
                <div className="flex flex-1 items-center">
                    <p className="mt-4 pl-5 pr-2 text-justify text-base leading-7 sm:mt-0 sm:text-lg sm:leading-10">
                        ایزی‌کوک برنامه‌ای است که از طریق آن می‌توانید دستور پخت
                        بسیاری از غذاها را پیدا و آن‌ها را امتحان کنید! همه‌ی
                        دستورپخت‌های این مجموعه توسط کاربران ثبت شده‌اند. شما
                        نیز می‌توانید بعد از ثبت نام در ایزی‌کوک، همه‌ی
                        دستورپخت‌ها را مشاهده کنید، آن‌ها را به لیست
                        موردعلاقه‌های خود اضافه کنید و اگر علاقه داشتید،
                        دستورپخت غذای خودتون رو در سایت ثبت کنید!
                    </p>
                </div>
                <div className="flex flex-1 items-center">
                    <Image src={CookingBook} alt="easy cooking book" />
                </div>
            </div>
        </main>
    );
}
