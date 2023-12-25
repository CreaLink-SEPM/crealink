import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/src/components/common/loading';
import FavoritePage from '@/src/components/common/FavoritePage';

export const metadata: Metadata = {
  title: 'CreaLink | Terms Of Use',
  description: 'Read our terms of use',
};

export default function FavoritesPage() {
  return (
    <div className="w-full md:container">
      <Suspense fallback={<Loading />}>
        <div className="w-full mt-10 leqading-3">
          <p className=" text-[22.5px] font-bold text-left text-neutral-800">Terms of Use</p>
          <hr className="w-[70%] border-collapse border-gray-300 h-[3px] mt-5" />
          <p className=" text-[16.203125px] text-left text-neutral-800 mt-8">Welcome to CreaLink!</p>
          <p className=" text-[16.0703125px] text-left text-neutral-800 mt-10">
            <span className=" text-[16.0703125px] text-left text-neutral-800 ">
              These Terms of Use (or "Terms") govern your use of CreaLink, except where we expressly state
            </span>
            <br />
            <span className=" text-[16.0703125px] text-left text-neutral-800">
              that separate terms (and not these) apply, and provide information about the Instagram Service
            </span>
            <br />
            <span className="text-[16.0703125px] text-left text-neutral-800">
              (the "Service"), outlined below. When you create an CreaLink account or use CreaLink, you
            </span>
            <br />
            <span className=" text-[16.0703125px] text-left text-neutral-800">agree to these Terms.</span>
          </p>
          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">
            The CreaLink Service
          </p>

          <div className="w-full mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                We agree to provide you with the CreaLink Service. The Service includes all of the CreaLink
              </span>
              <br />
              <span className=" text-[15.9375px]  text-neutral-800">
                products, features, applications, services, technologies, and software that we provide to
              </span>
              <br />
              <span className=" text-[15.9375px]  text-neutral-800">
                advance Instagram's mission: To bring you closer to the people and things you love. The Service
              </span>
              <br />
              <span className=" text-[15.9375px]  text-neutral-800">is made up of the following aspects:</span>
            </p>
          </div>
          <div className="ml-3 mt-2">
            <p className=" text-[15.9375px] text-left mt-5">
              <span className=" text-[15.9375px] font-semibold text-left text-neutral-800">
                Offering personalized opportunities to create, connect, communicate, discover and
              </span>
              <br />
              <span className=" text-[15.9375px] font-semibold text-left text-neutral-800">share.</span>
              <span className="text-[15.9375px] text-left text-neutral-800">
                People are different. So we offer you different{' '}
              </span>
              <span className="text-[15.9375px] text-left text-[#0095f6]">types of accounts</span>
              <span className=" text-[15.9375px] text-left text-neutral-800">and features to</span>
              <br />
              <span className=" text-[15.9375px] text-left text-neutral-800">
                help you create, share, grow your presence, and communicate with people on and off
              </span>
              <br />
              <span className="text-[15.9375px] text-left text-neutral-800">
                CreaLink. We also want to strengthen your relationships through shared experiences
              </span>
              <br />
              <span className=" text-[15.9375px] text-left text-neutral-800">
                that you actually care about. So we build systems that try to understand who and what
              </span>
              <br />
              <span className=" text-[15.9375px] text-left text-neutral-800">
                you and others care about, and use that information to help you create, find, join and
              </span>
              <br />
              <span className=" text-[15.9375px] text-left text-neutral-800">
                share in experiences that matter to you. Part of that is highlighting content, features,
              </span>
              <br />
              <span className=" text-[15.9375px] text-left text-neutral-800">
                offers and accounts that you might be interested in, and offering ways for you to
              </span>
              <br />
              <span className=" text-[15.9375px] text-left text-neutral-800">
                experience CreaLink, based on things that you and others do on and off CreaLink.
              </span>
            </p>
          </div>
        </div>
     
          <div className="mt-3 ml-3">
            <p className="text-[16.203125px] text-left text-neutral-800">
              <span className=" text-[16.203125px] font-semibold text-left text-neutral-800">
                Fostering a positive, inclusive, and safe environment.
              </span>
              <br />
              <span className=" text-[16.203125px] text-left text-neutral-800">
                We develop and use tools and offer resources to our community members that help to
              </span>
              <br />
              <span className=" text-[16.203125px] text-left text-neutral-800">
                make their experiences positive and inclusive, including when we think they might need
              </span>
              <br />
              <span className=" text-[16.203125px] text-left text-neutral-800">
                help. We also have teams and systems that work to combat abuse and violations of our
              </span>
              <br />
              <span className=" text-[16.203125px] text-left text-neutral-800">
                Terms and policies, as well as harmful and deceptive behavior. <br /> We use all the information we
                have-including your information-to try to keep our platform secure.
              </span>
            </p>
          </div>

            <div className="mb-5 ml-3 mt-2">
              <p className=" text-[15.9375px] text-left text-neutral-800">
                <span className="text-[15.9375px] font-semibold text-left text-neutral-800">
                  Research and innovation.
                </span>
                <br />
                <span className=" text-[15.9375px] text-left text-neutral-800">
                  We use the information we have to study our Service and collaborate with others on
                </span>
                <br />
                <span className="text-[15.9375px] text-left text-neutral-800">
                  research to make our Service better and contribute to the well-being of our community.
                </span>
              </p>
            </div>

        <p className=" text-[18.90625px] font-semibold text-left text-neutral-800">Your Commitments</p>
        <p className="text-[15.9375px] text-left text-neutral-800 mt-5">
          <span className=" text-[15.9375px] text-left text-neutral-800">
            In return for our commitment to provide the Service, we require you to make the below
          </span>
          <br />
          <span className=" text-[15.9375px] text-left text-neutral-800">commitments to us.</span>
        </p>
        <p className=" text-[15.9375px] text-left text-neutral-800 mt-5">
          <span className=" text-[15.9375px] font-semibold text-left text-neutral-800">Who can use Instagram.</span>
          <span className=" text-[15.9375px] text-left text-neutral-800">
            We want our Service to be as open and inclusive as possible, but we
          </span>
          <br />
          <span className=" text-[15.9375px] text-left text-neutral-800">
            also want it to be safe, secure and in accordance with the law. So, we need you to commit to a
          </span>
          <br />
          <span className=" text-[15.9375px] text-left text-neutral-800">
            few restrictions in order to be part of the Instagram community.
          </span>
        </p>

        <p className=" text-[15.9375px] text-left text-neutral-800 ml-3 mt-5">
          <span className=" text-[15.9375px] text-left text-neutral-800">
            You must be at least 13 years old or the minimum legal age in your country to use
          </span>
          <br />
          <span className=" text-[15.9375px] text-left text-neutral-800">CreaLink.</span>
        </p>

        <div className="ml-3 mt-5">
          <p className=" text-[15.9375px] text-left text-neutral-800">
            <span className=" text-[15.9375px] text-left text-neutral-800">
              You must not be prohibited from receiving any aspect of our Service under applicable
            </span>
            <br />
            <span className="text-[15.9375px] text-left text-neutral-800">
              laws or engaging in payments-related Services if you are on an applicable denied party
            </span>
            <br />
            <span className=" text-[15.9375px] text-left text-neutral-800">listing.</span>
          </p>
        </div>
        <p className="text-[15.9375px] text-left text-neutral-800 ml-3 mt-5">
          <span className=" text-[15.9375px] text-left text-neutral-800">
            We must not have previously disabled your account for violation of law or any of our
          </span>
          <br />
          <span className=" text-[15.9375px] text-left text-neutral-800">policies.</span>
        </p>

        <p className=" text-[15.9375px] text-left text-neutral-800 ml-3 mt-5">You must not be a convicted sex offender.</p>
      </Suspense>
    </div>
  );
}
