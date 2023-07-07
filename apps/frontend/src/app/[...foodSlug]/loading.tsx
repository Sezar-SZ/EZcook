import Spinner from "../components/LoadingSpinner";

export default function Loading() {
    return (
        <div className="mt-5 flex w-full justify-center">
            <Spinner />
        </div>
    );
}
