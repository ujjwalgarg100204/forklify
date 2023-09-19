import Article from "@components/Article";
import Link from "next/link";

const ConditionsPage = () => {
    return (
        <Article>
            <h1
                className={
                    "mb-12 text-center text-3xl font-bold text-black lg:text-4xl"
                }
            >
                Terms & Conditions of Use
            </h1>
            <article className="space-y-10">
                <div className="space-y-4">
                    <p>
                        Welcome to our recipe sharing platform with blog
                        options. By using our platform, you agree to be bound by
                        the following terms and conditions:
                    </p>

                    <ol className="space-y-4">
                        <li className="space-y-1">
                            <h2 className="text-xl font-bold lg:text-2xl">
                                Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using our platform, you agree to
                                these terms and conditions, as well as our
                                Privacy Policy, which is incorporated by
                                reference. If you do not agree to all of the
                                terms and conditions, then you may not use our
                                platform.
                            </p>
                        </li>

                        <li className="space-y-1">
                            <h2 className="text-xl font-bold lg:text-2xl">
                                Use of Platform
                            </h2>
                            <p>
                                Our platform allows you to share and discover
                                recipes, as well as create and read blog posts
                                related to food and cooking. You may use our
                                platform only for lawful purposes and in
                                accordance with these terms and conditions.
                            </p>
                        </li>

                        <li className="space-y-1">
                            <h2 className="text-xl font-bold lg:text-2xl">
                                User Accounts
                            </h2>
                            <p>
                                To use certain features of our platform, you may
                                be required to create a user account. You are
                                responsible for maintaining the confidentiality
                                of your account and password, and for
                                restricting access to your computer or mobile
                                device. You agree to accept responsibility for
                                all activities that occur under your account or
                                password.
                            </p>
                        </li>

                        <li>
                            <h2 className="text-xl font-bold lg:text-2xl">
                                User Content
                            </h2>
                            <p>
                                Our platform allows you to post, link, store,
                                share and otherwise make available certain
                                information, text, graphics, videos, or other
                                material (&quot;Content&quot;). You retain all
                                rights in, and are solely responsible for, the
                                Content you post to our platform.
                            </p>
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <p>
                        By posting Content to our platform, you grant us a
                        non-exclusive, royalty-free, transferable,
                        sub-licensable, worldwide license to use, modify,
                        publicly perform, publicly display, reproduce, and
                        distribute such Content on and through our platform.
                    </p>

                    <div>
                        You represent and warrant that:
                        <ol className="list-inside list-decimal pl-6">
                            <li>
                                The Content is yours (you own it) or you have
                                the right to use it and grant us the rights and
                                license as provided in these terms
                            </li>
                            <li>
                                The posting of your Content on or through our
                                platform does not violate the privacy rights,
                                publicity rights, copyrights, contract rights,
                                or any other rights of any person or entity.
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Prohibited Conduct
                    </h2>
                    <p>
                        You agree not to engage in any of the following
                        activities:
                    </p>

                    <p>
                        Posting or transmitting any Content that is unlawful,
                        threatening, abusive, harassing, defamatory, vulgar,
                        obscene, or racially, ethnically, or otherwise
                        objectionable; Impersonating any person or entity,
                        including any of our employees or representatives;
                        Posting or transmitting any Content that contains
                        viruses or any other harmful code, files, or programs;
                        Interfering with the security of our platform or
                        attempting to gain unauthorized access to our system;
                        Modifying, adapting, hacking, reverse engineering, or
                        otherwise tampering with our platform or the software
                        used to provide our platform;
                    </p>
                    <p>
                        Using any automated means to access our platform or
                        collect any information from our platform; Using our
                        platform for any commercial purpose without our prior
                        written consent; Encouraging or enabling any other
                        person to engage in any of the prohibited activities.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Intellectual Property Rights
                    </h2>
                    <p>
                        Our platform and its entire contents, features, and
                        functionality (including but not limited to all
                        information, software, text, displays, images, video,
                        and audio) are owned by us, our licensors, or other
                        providers of such material and are protected by United
                        States and international copyright, trademark, patent,
                        trade secret, and other intellectual property or
                        proprietary rights laws.
                    </p>

                    <p>
                        These terms permit you to use our platform for your
                        personal, non-commercial use only. You must not
                        reproduce, distribute, modify, create derivative works
                        of, publicly display, publicly perform, republish,
                        download, store, or transmit any of the material on our
                        platform, except as follows:
                    </p>
                    <ul className="list-inside list-disc space-y-2 pl-6">
                        <li>
                            Your computer or mobile device may temporarily store
                            copies of such materials in RAM incidental to your
                            accessing and viewing those materials;
                        </li>
                        <li>
                            You may store files that are automatically cached by
                            your Web browser for display
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Termination
                    </h2>
                    <p>
                        We reserve the right to terminate or suspend access to
                        our platform and blog, without prior notice or
                        liability, for any reason whatsoever, including without
                        limitation if you breach the Terms. All provisions of
                        the Terms which by their nature should survive
                        termination shall survive termination, including,
                        without limitation, ownership provisions, warranty
                        disclaimers, indemnity, and limitations of liability.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Governing Law
                    </h2>
                    <p>
                        These Terms shall be governed and construed in
                        accordance with the laws of India, without regard to its
                        conflict of law provisions.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify
                        or replace these Terms at any time. If a revision is
                        material, we will try to provide at least 30 days&apos;
                        notice prior to any new terms taking effect. What
                        constitutes a material change will be determined at our
                        sole discretion.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold lg:text-2xl">
                        Contact Us
                    </h2>
                    <p>
                        If you have any questions about these Terms, please
                        contact us at{" "}
                        <Link
                            href="mailto://ujjwalgarg100204@gmail.com"
                            className="text-blue-600 transition duration-200 hover:underline"
                        >
                            ujjwalgarg100204@gmail.com
                        </Link>{" "}
                        .
                    </p>
                </div>
            </article>
        </Article>
    );
};

export default ConditionsPage;
