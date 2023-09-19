import Article from "@components/Article";
import Link from "next/link";

const PrivacyPolicyPage = () => {
    const todayDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    return (
        <Article>
            <h1 className="mb-12 text-center text-3xl font-bold lg:text-4xl">
                Privacy Policy
            </h1>
            <article className="space-y-10">
                <div className="space-y-4">
                    <p>
                        At Forklify, we are committed to protecting the privacy
                        and security of our users&apos; personal information.
                        This Privacy Policy describes how we collect, use, and
                        share your personal information in connection with your
                        use of our Recipe Sharing App with Blog Options (the
                        &quot;App&quot;).
                    </p>

                    <p>
                        By using the App, you agree to the terms of this Privacy
                        Policy. If you do not agree with the terms of this
                        Privacy Policy, please do not use the App.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Information We Collect
                    </h2>
                    <p>
                        We collect the following types of information about our
                        users:
                    </p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            Personal Information: We may collect personal
                            information such as your name, email address, and
                            location when you register for an account or sign up
                            for our newsletter.
                        </li>

                        <li>
                            Recipe Information: When you create or share a
                            recipe on the App, we collect information about the
                            recipe, including the title, ingredients, and
                            cooking instructions.
                        </li>

                        <li>
                            Blog Information: When you create or publish a blog
                            post on the App, we collect information about the
                            post, including the title, content, and any images
                            or videos.
                        </li>

                        <li>
                            Usage Information: We collect information about how
                            you use the App, including the recipes and blog
                            posts you view, the searches you perform, and the
                            features you use.
                        </li>

                        <li>
                            Device Information: We may collect information about
                            the devices you use to access the App, including the
                            type of device, operating system, and browser.
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        How We Use Your Information
                    </h2>

                    <p>
                        We may use your personal information, recipe
                        information, blog information, usage information, and
                        device information for the following purposes:
                    </p>

                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            To provide and improve the App and our services to
                            you.
                        </li>
                        <li>
                            To communicate with you about the App, our services,
                            and promotions.
                        </li>
                        <li>To personalize your experience on the App.</li>
                        <li>
                            To analyze and improve the App and our services.
                        </li>
                        <li>To comply with legal obligations.</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Sharing Your Information
                    </h2>

                    <p>
                        We may share your personal information, recipe
                        information, blog information, usage information, and
                        device information with third parties for the following
                        purposes:
                    </p>

                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            Service Providers: We may share your information
                            with third-party service providers who perform
                            services on our behalf, such as hosting, data
                            analysis, and customer service.
                        </li>
                        <li>
                            Legal Requirements: We may share your information in
                            response to a subpoena, court order, or other legal
                            request.
                        </li>
                        <li>
                            Business Transfers: We may share your information in
                            connection with a merger, acquisition, or sale of
                            all or a portion of our assets.
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">Security</h2>

                    <p>
                        We take reasonable measures to protect your personal
                        information from unauthorized access, use, or
                        disclosure. However, no method of transmission over the
                        internet or electronic storage is 100% secure, and we
                        cannot guarantee absolute security.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Your Choices
                    </h2>

                    <p>
                        You may opt-out of receiving promotional communications
                        from us by following the instructions in those
                        communications. You may also modify your account
                        settings to control what information is visible to other
                        users.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="font-heading text-2xl font-bold">
                        Children&apos;s Privacy
                    </h2>

                    <p>
                        The App is not intended for use by children under the
                        age of 13, and we do not knowingly collect personal
                        information from children under the age of 13.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="font-heading text-xl font-bold lg:text-2xl">
                        Changes to this Privacy Policy
                    </h2>

                    <p>
                        We may update this Privacy Policy from time to time. If
                        we make material changes to this Privacy Policy, we will
                        notify you by email or by posting a notice on the App.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Contact Us
                    </h2>

                    <p>
                        If you have any questions or concerns about this Privacy
                        Policy or our privacy practices, please contact us at{" "}
                        <Link
                            href="mailto://ujjwalgarg100204@gmail.com"
                            className="text-blue-600 transition duration-200 hover:underline"
                        >
                            ujjwalgarg100204@gmail.com
                        </Link>
                        .
                    </p>
                </div>
                <h3 className="font-bold lg:text-xl">
                    Effective date:{" "}
                    <span className={"text-orange"}>{todayDate}</span>
                </h3>
            </article>
        </Article>
    );
};

export default PrivacyPolicyPage;
