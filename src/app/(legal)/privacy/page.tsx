export default function PolicyPage() {
    const updateOn = new Date(2025, 7, 19).toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground">Your privacy is important to us</p>
                    <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                    <p className="text-lg text-muted-foreground mt-6">
                        Last updated: {updateOn}
                    </p>
                </header>

                <div className="prose prose-invert max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                            Information We Collect
                        </h2>
                        <div className="space-y-4 text-foreground leading-relaxed">
                            <p>
                                We collect information you provide directly to us, such as when you create an account, use our services,
                                or contact us for support.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Account information (username, email address, discordId)</li>
                                <li>Profile information and preferences</li>
                                <li>Communications with our support team</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                            How We Use Your Information
                        </h2>
                        <div className="space-y-4 text-foreground leading-relaxed">
                            <p>We use the information we collect to provide, maintain, and improve our services, including to:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Process transactions and send related information</li>
                                <li>Send technical notices and support messages</li>
                                <li>Respond to your comments and questions</li>
                                <li>Monitor and analyze trends and usage</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                            Information Sharing
                        </h2>
                        <div className="space-y-4 text-foreground leading-relaxed">
                            <p>
                                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                                consent, except as described in this policy.
                            </p>
                            <p>We may share your information in the following circumstances:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>With your explicit consent</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect our rights and safety</li>
                                <li>In connection with a business transfer</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">Your Rights</h2>
                        <div className="space-y-4 text-foreground leading-relaxed">
                            <p>You have certain rights regarding your personal information, including:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Access and update your account information</li>
                                <li>Request deletion of your personal data</li>
                                <li>Opt out of marketing communications</li>
                                <li>Request a copy of your data</li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us at{" "}
                                <a href="mailto:privacy@ikcheatniet.nl" className="hover:underline">
                                    privacy@ikcheatniet.nl
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">Data Security</h2>
                        <div className="space-y-4 text-foreground leading-relaxed">
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information
                                against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <p>
                                However, no method of transmission over the internet or electronic storage is completely secure, so we
                                cannot guarantee absolute security.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                            Changes to This Policy
                        </h2>
                        <div className="space-y-4 text-foreground leading-relaxed">
                            <p>
                                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                                new policy on this page and updating the &quot;Last Updated&quot; date.
                            </p>
                            <p>Your continued use of our services after any changes constitutes acceptance of the updated policy.</p>
                        </div>
                    </section>

                    <footer className="mt-16 pt-8 border-t border-border">
                        <div className="bg-card rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-card-foreground mb-3">Contact Us</h3>
                            <p className="text-muted-foreground mb-2">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="space-y-1 text-sm">
                                <p className="text-muted-foreground">
                                    Email:{" "}
                                    <a href="mailto:privacy@ikcheatniet.nl" className="hover:underline">
                                        privacy@ikcheatniet.nl
                                    </a>
                                </p>
                                <p className="text-muted-foreground">Last Updated on: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
