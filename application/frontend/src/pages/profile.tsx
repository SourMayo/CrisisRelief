const Profile = () => {
    return (
        <section className="relative isolate overflow-hidden min-h-screen bg-linear-to-br/increasing from-[#66B2EF] to-[#AC94FB] px-6 py-24 sm:py-32 lg:px-8">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(80rem_80rem_at_top,var(--color-indigo-100),white)] opacity-30" />
            {/* Old skew effect */}
            {/* <div className="absolute inset-0 -z-10 w-[150%] h-screen skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 xl:origin-top-left right-0" /> */}

            {/* Main Content */}
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <figure className="mt-10">
                {/* User Image */}
                <img
                    alt="User Profile"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="mx-auto size-32 rounded-full border-4 border-indigo-500 shadow-lg"
                />

                {/* Page Description */}
                <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9 mt-6">
                    <p>Your Profile</p>
                </blockquote>

                {/* User Details */}
                <figcaption className="mt-10">
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900 text-lg">
                        You
                    </div>
                    <svg
                        width={3}
                        height={3}
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="fill-gray-900"
                    >
                        <circle r={1} cx={1} cy={1} />
                    </svg>
                    <div className="text-gray-600">
                        {"User"}
                    </div>
                    </div>
                </figcaption>
                </figure>
            </div>
            </section>
    );

}

export default Profile;