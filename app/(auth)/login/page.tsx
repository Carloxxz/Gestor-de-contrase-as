import ImageAuth from "./components/ImageAuth/ImageAuth";
import TabsForm from "./components/TabsForm/TabsForm";

export default function LoginPage() {
    return (
        <div className="grid md:grid-cols-2 h-full max-h-screen overflow-hidden">
            <div className="flex justify-center h-full">
                <div className="text-white flex flex-col items-center justify-center p-6">
                    <h1 className="text-blue-500 text-2xl text-center mb-5">PasswordLogin</h1>
                    <h2 className="text-4xl font-medium text-black">Welcome back</h2>
                    <p className="text-center mt-4 mb-6 text-slate-400 text-sm">
                        Welcome back, Please enter your details
                    </p>
                    <TabsForm />
                </div>
            </div>
            <ImageAuth />
        </div>
    );
}