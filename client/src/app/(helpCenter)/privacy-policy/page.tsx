import { Metadata } from 'next';
import React, { Suspense } from 'react';
import Loading from '@/src/components/common/loading';

export const metadata: Metadata = {
  title: 'CreaLink | Privacy Policy',
  description: 'Read our privay policy',
};

function Privacypage() {
  return (
    <div className="w-full md:container">
      <Suspense fallback={<Loading />}>
        <div className="w-full mt-10 leading-7">
          <p className=" text-[22.5px] font-bold text-left text-neutral-800">Privacy Policy</p>
          <hr className="w-[70%] border-collapse border-gray-300 h-[3px] mt-5" />
          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">The CreaLink Service</p>

          <div className="w-[63%] mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                In the Privacy Policy, we explain how we collect, use, share, retain and transfer information. We also
                let you know your rights. Each section of the Policy includes helpful examples and simpler language to
                make our practices easier to understand. We’ve also added links to resources where you can learn more
                about the privacy topics that interest you.
              </span>
            </p>
          </div>

          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">
            How do we use your information
          </p>
          <div className="w-[63%] mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                We use information we collect to provide a personalized experience to you, including ads, along with the
                other purposes we explain in detail below. For some of these purposes, we use information across our
                Products and across your devices. The information we use for these purposes is automatically processed
                by our systems. But in some cases, we also use manual review to access and review your information. To
                use less information that’s connected to individual users, in some cases we de-identify or aggregate
                information or anonymize it so that it no longer identifies you. We use this information in the same
                ways we use your information as described in this section.
              </span>
            </p>
          </div>

          <p className="text-[18.75px] font-semibold text-left text-neutral-800 mt-10">
            How long do we keep your information ?
          </p>
          <div className="w-[63%] mt-5">
            <p className="text-[15.9375px]  text-neutral-800">
              <span className=" text-[15.9375px] text-neutral-800">
                We keep information as long as we need it provide our Product, comply with legal obligations or protect
                our or other's interest. We decide how long we need information on a case-by-case basis.Here's what we
                condider when we decide:
              </span>
            </p>
            <div className='pl-5 mt-2'>
              <ul className="list-disc mt-5">
                <li>If we need it to operate or provide our Products. For example, we need to keep some of your information to maintain your account. </li>
                <li>The feature we use it for, and how that feature works. For example, messages sent using Messenger’s vanish mode are retained for less time than regular messages.</li>
                <li>How long we need to retain the information to comply with certain legal obligations.</li>
                <li>If we need it for other legitimate purposes, such as to prevent harm; investigate possible violations of our terms or policies; promote safety, security and integrity; or protect ourselves, including our rights, property or products</li>
              </ul>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Privacypage;
