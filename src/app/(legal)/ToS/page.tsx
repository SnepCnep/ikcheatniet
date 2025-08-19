export default function ToSPage() {
    const updateOn = new Date(2025, 7, 19).toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                        <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
                        <p className="text-lg text-muted-foreground mt-6">
                            Last updated: {updateOn}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing and using IkCheatNiet (&quot;the Service&quot;), you accept and agree to be bound by the terms and
                                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                IkCheatNiet provides online services and content. The Service may include various features and
                                functionalities that are subject to change without notice.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
                            <div className="space-y-3">
                                <p className="text-muted-foreground leading-relaxed">
                                    To access certain features of the Service, you may be required to create an account. You agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Provide accurate and complete information when creating your account</li>
                                    <li>Maintain the security of your account credentials</li>
                                    <li>Accept responsibility for all activities that occur under your account</li>
                                    <li>Notify us immediately of any unauthorized use of your account</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">4. Acceptable Use</h2>
                            <div className="space-y-3">
                                <p className="text-muted-foreground leading-relaxed">You agree not to use the Service to:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Infringe upon the rights of others</li>
                                    <li>Transmit harmful, offensive, or inappropriate content</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with the proper functioning of the Service</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">5. Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The Service and its original content, features, and functionality are owned by IkCheatNiet and are
                                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                                laws.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">6. Privacy Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                                Service, to understand our practices regarding the collection and use of your information.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">7. Termination</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                                or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
                                breach the Terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">8. Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The information on this Service is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law,
                                this Company excludes all representations, warranties, conditions and terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                In no event shall IkCheatNiet, nor its directors, employees, partners, agents, suppliers, or affiliates,
                                be liable for any indirect, incidental, special, consequential, or punitive damages.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">10. Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                                provide at least 30 days notice prior to any new terms taking effect.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">11. Governing Law</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                These Terms shall be interpreted and governed by the laws of the jurisdiction in which IkCheatNiet
                                operates, without regard to its conflict of law provisions.
                            </p>
                        </section>
                    </div>

                    {/* Contact Footer */}
                    <div className="border-t border-border pt-8 mt-12">
                        <div className="bg-muted/50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-3">Questions About These Terms?</h3>
                            <p className="text-muted-foreground mb-4">
                                If you have any questions about these Terms of Service, please contact us.
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>Email: legal@ikcheatniet.nl</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
