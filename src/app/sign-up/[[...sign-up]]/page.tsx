import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return <div className='m-auto flex justify-center items-center my-5'>
        <SignUp />
    </div>;
}