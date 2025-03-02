import { Button } from "@radix-ui/themes";
import { Modal } from "~/components/theme/Modal";
import { application } from "~/global/config/application.config";

function LoginPageV2() {
   return (
      <>
         <div className="flex flex-col justify-center h-full">
            <h1 className="containerX text-center -mt-20">
               Welcome to Sabaody <b className="text-(--accent-10)">Space</b>
            </h1>
            <p className="containerX text-center mt-2">
               Sign in below (model will be able to integrate into your workflow
               directly)
            </p>
            <section className="containerX mt-6">
               <div className="flex justify-center">
                  <a
                     href={application.API_URL + "/oauth2/authorization/github"}
                  >
                     <Button variant="soft" color="gray" size="4">
                        Continue with Github <i className="pi pi-github"></i>
                     </Button>
                  </a>
               </div>
               <div className="text-center mt-2">
                  <small>
                     By continuing, you agree to our{" "}
                     <Modal
                        trigger={
                           <u className="cursor-pointer">Terms of Service</u>
                        }
                        content={
                           <>
                              <h3>
                                 Terms of Service for Signing in with GitHub
                              </h3>

                              <p>
                                 <strong>Last Updated: [Date]</strong>
                              </p>

                              <p>
                                 Welcome to Sabaody.Space! By signing in with
                                 GitHub, you agree to the following terms and
                                 conditions. Please read them carefully before
                                 proceeding.
                              </p>

                              <h3>1. Acceptance of Terms</h3>
                              <p>
                                 By using the "Sign in with GitHub" feature, you
                                 accept these Terms of Service and our{" "}
                                 <a href="#">Privacy Policy</a>. If you do not
                                 agree, please do not use this feature.
                              </p>

                              <h3>2. Account and Authentication</h3>
                              <p>
                                 When you sign in with GitHub, we may collect
                                 your GitHub username, email address, and
                                 publicly available information.
                              </p>
                              <p>
                                 You are responsible for maintaining the
                                 security of your GitHub account and for all
                                 activities that occur through it.
                              </p>

                              <h3>3. Data Usage</h3>
                              <p>
                                 We use your GitHub information to facilitate
                                 authentication and improve user experience.
                              </p>
                              <p>
                                 Your data will not be shared with third parties
                                 without your consent, except as required by
                                 law.
                              </p>

                              <h3>4. User Conduct</h3>
                              <p>By signing in, you agree not to:</p>
                              <ul>
                                 <li>
                                    Use our services for any unlawful or
                                    prohibited activities.
                                 </li>
                                 <li>
                                    Attempt to gain unauthorized access to any
                                    part of the service.
                                 </li>
                              </ul>

                              <h3>5. Termination</h3>
                              <p>
                                 We reserve the right to terminate or suspend
                                 your access if you violate these terms.
                              </p>

                              <h3>6. Changes to Terms</h3>
                              <p>
                                 We may update these terms occasionally.
                                 Continued use of the service implies acceptance
                                 of the updated terms.
                              </p>

                              <h3>7. Contact Us</h3>
                              <p>
                                 If you have questions about these terms, please
                                 contact us at{" "}
                                 <a href="mailto:support@sabaody.space">
                                    support@sabaody.space
                                 </a>
                                 .
                              </p>

                              <p>
                                 By signing in with GitHub, you acknowledge that
                                 you have read, understood, and agree to these
                                 terms.
                              </p>
                           </>
                        }
                     />{" "}
                     and{" "}
                     <Modal
                        trigger={
                           <u className="cursor-pointer">Privacy Policy</u>
                        }
                        content={
                           <>
                              <h3>Privacy Policy for Signing in with GitHub</h3>

                              <p>
                                 <strong>Last Updated: [Date]</strong>
                              </p>

                              <p>
                                 Welcome to Sabaody.Space! This Privacy Policy
                                 explains how we collect, use, and protect your
                                 information when you sign in with GitHub.
                                 Please read it carefully.
                              </p>

                              <h3>1. Information We Collect</h3>
                              <p>
                                 When you sign in with GitHub, we may collect
                                 the following information:
                              </p>
                              <ul>
                                 <li>Your GitHub username</li>
                                 <li>Email address</li>
                                 <li>Publicly available profile information</li>
                              </ul>

                              <h3>2. How We Use Your Information</h3>
                              <p>We use the collected information to:</p>
                              <ul>
                                 <li>
                                    Authenticate your access to our services
                                 </li>
                                 <li>
                                    Personalize your experience on Sabaody.Space
                                 </li>
                                 <li>
                                    Improve our services based on user feedback
                                 </li>
                              </ul>

                              <h3>3. Data Sharing</h3>
                              <p>
                                 We do not share your information with third
                                 parties without your consent, except:
                              </p>
                              <ul>
                                 <li>
                                    When required by law or in response to legal
                                    requests
                                 </li>
                                 <li>
                                    To protect the security and integrity of our
                                    services
                                 </li>
                              </ul>

                              <h3>4. Data Security</h3>
                              <p>
                                 We take reasonable measures to protect your
                                 information from unauthorized access,
                                 alteration, or disclosure. However, no internet
                                 transmission is completely secure.
                              </p>

                              <h3>5. Your Rights</h3>
                              <p>You have the right to:</p>
                              <ul>
                                 <li>Access and update your information</li>
                                 <li>Request deletion of your data</li>
                                 <li>Withdraw consent for data processing</li>
                              </ul>

                              <h3>6. Cookies and Tracking</h3>
                              <p>
                                 We may use cookies to enhance user experience.
                                 By signing in, you consent to our use of
                                 cookies as described in our{" "}
                                 <a href="#">Cookie Policy</a>.
                              </p>

                              <h3>7. Changes to this Policy</h3>
                              <p>
                                 We may update this Privacy Policy from time to
                                 time. Continued use of our services implies
                                 acceptance of the updated policy.
                              </p>

                              <h3>8. Contact Us</h3>
                              <p>
                                 If you have questions about this Privacy
                                 Policy, please contact us at{" "}
                                 <a href="mailto:support@sabaody.space">
                                    support@sabaody.space
                                 </a>
                                 .
                              </p>

                              <p>
                                 By signing in with GitHub, you acknowledge that
                                 you have read, understood, and agree to this
                                 Privacy Policy.
                              </p>
                           </>
                        }
                     />
                  </small>
               </div>
            </section>
         </div>
      </>
   );
}

export { LoginPageV2 };
