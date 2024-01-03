import { Metadata } from 'next';
import React, { Suspense } from 'react';
import Loading from '@/src/components/common/loading';

export const metadata: Metadata = {
  title: 'CreaLink | Privacy Policy',
  description: 'Read our privay policy',
};

function Cookiespage() {
  return (
    <div className="w-full md:container">
      <Suspense fallback={<Loading />}>
        <div className="w-full mt-10 leading-7">
          <p className=" text-[22.5px] font-bold text-left text-neutral-800">Cookies Policy</p>
          <hr className="w-[70%] border-collapse border-gray-300 h-[3px] mt-5" />
          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">
            What are cookies, and what does this policy cover?
          </p>

          <div className="w-[63%] mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                Cookies are small pieces of text used to store information on web browsers. Cookies are used to store
                and receive identifiers and other information on computers, phones and other devices. Other
                technologies, including data that we store on your web browser or device, identifiers associated with
                your device and other software, are used for similar purposes. In this policy, we refer to all of these
                technologies as “cookies”. We use cookies if you have a Facebook or Instagram account, use the ,
                including our website and apps, or visit other websites and apps that use the Meta Products (including
                the Like button). Cookies enable Meta to offer the Meta Products to you and to understand the
                information that we receive about you, including information about your use of other websites and apps,
                whether or not you are registered or logged in. This policy explains how we use cookies and the choices
                you have. Except as otherwise stated in this policy, the will apply to our processing of the data that
                we collect via cookies.
              </span>
            </p>
          </div>
          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">Why do we use cookies?</p>

          <div className="w-[63%] mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                Cookies help us provide, protect and improve the Meta Products, such as by personalising content,
                tailoring and measuring ads, and providing a safer experience. The cookies that we use include session
                cookies, which are deleted when you close your browser, and persistent cookies, which stay in your
                browser until they expire or you delete them.
              </span>
            </p>
          </div>
          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">Where do we use cookies?</p>

          <div className="w-[63%] mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                Meta uses cookies and receives information when you visit those sites and apps, including device
                information and information about your activity, without any further action from you. This occurs
                whether or not you have a Facebook or Instagram account or are logged in.
              </span>
            </p>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Cookiespage;
