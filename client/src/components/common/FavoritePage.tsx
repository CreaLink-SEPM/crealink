'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Menu } from 'antd';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoritePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session) return;

      const token = session?.user?.accessToken;
      try {
        const response = await axios.get('http://54.169.199.32:5000/api/feed/savedPosts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bear ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;

          if (data.status === 'success') {
            setPosts(data.savedPosts);
          } else {
            console.error('Error fetching posts:', data.status);
          }
        } else {
          console.error('Error fetching posts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    // fetchPosts();
    const delay = setTimeout(() => {
      fetchPosts();
    }, 300);

    // Clear the timeout on component unmount
    return () => clearTimeout(delay);
  }, [session]);

  return (
    <div>
      <div className="text-center font-extrabold pl-20 text-2xl mt-4">Your Saved Post</div>
      <div className="flex items-center justify-center mb-[12%]">
        <div className="w-full h-full max-w-md">
          <div className="mt-10">
            {loading ? (
              <>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </>
            ) : (
              <>
                {posts &&
                  posts.map((post, index) => (
                    <div
                      key={index}
                      className=" w-[572px] h-[533.99px]"
                      style={{ borderTop: '0.5px solid lightgrey', marginBottom: '33px' }}
                    >
                      <div className="relative w-[572px] h-[533.99px] top-[20px]">
                        <div className="h-[40px] top-0 absolute w-[48px] left-0">
                          <div className="relative top-[4px] w-[36px] h-[36px] bg-[#efefef] rounded-[18px]">
                            <div className="h-[36px] bg-neutral-100 rounded-[18px]">
                              <div className="w-[36px] h-[36px]">
                                <div className="relative w-[37px] h-[37px] rounded-[17.5px]">
                                  <div className="w-[36px] h-[36px] rounded-[18px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/377212994-626721102778908-3499740340252537033-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0" />
                                  <div className="w-[37px] h-[37px] rounded-[17.5px] border border-solid border-[#00000026] absolute top-0 left-0" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute w-[524px] h-[22px] -top-px left-[48px]">
                          <div className="relative h-[22px]">
                            <div className="w-[470px] absolute h-[21px] top-0 left-0">
                              <div className="w-[85px] h-[21px]">
                                <div className="h-[21px]">
                                  <div className="w-[85px] h-[21px]">
                                    <div className="relative h-[21px]">
                                      <div className="absolute w-[85px] h-[18px] top-0 left-0 [font-family:'Roboto',Helvetica] font-semibold text-black text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
                                        {post?.title}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute w-[54px] h-[22px] top-0 left-[470px]">
                              <div className="absolute w-[24px] h-[14px] top-[4px] left-0">
                                <div className="w-[24px] text-[14.4px] absolute h-[21px] top-[-4px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-center tracking-[0] leading-[21px] whitespace-nowrap">
                                  12h
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-[466px] top-[40px] absolute w-[48px] left-0" />
                        <div className="h-[485px] absolute w-[524px] top-[21px] left-[48px]">
                          <div className="relative h-[477px] top-[8px]">
                            <div className="h-[435px] top-0 absolute w-[524px] left-0">
                              <div className="w-[360px] h-[430px] rounded-[8px]">
                                <div className="h-[430px]">
                                  <div className="w-[360px] h-[430px]">
                                    <div className="h-[430px]">
                                      <div className="relative w-[500px] h-[430px] rounded-[7px]">
                                        <div className="main-post-image overflow-hidden">
                                          <img
                                            src={post.image || '/assets/images/profile.jpg'}
                                            alt="Post content"
                                            className="w-full h-[420px] object-cover rounded-lg"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute w-[531px] h-[36px] top-[441px] left-[-7px]">
                              <img
                                className="absolute w-[36px] h-[36px] top-0 left-0 object-cover"
                                alt="Div"
                                src="https://c.animaapp.com/n1QiTcNd/img/div-x6s0dn4-4.svg"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute w-[572px] h-[28px] top-[506px] left-0">
                          <div className="relative w-[202px] h-[28px]">
                            <div className="absolute w-[48px] h-[20px] top-[4px] left-0">
                              <div className="w-[40px] h-[20px]">
                                <div className="relative w-[32px] h-[20px] left-[4px]">
                                  <div className="relative h-[20px]">
                                    <div className="absolute w-[16px] h-[16px] top-[2px] left-0 bg-neutral-100 rounded-[8px]">
                                      <div className="h-[16px]">
                                        <div className="relative w-[17px] h-[17px] rounded-[7.5px]">
                                          <div className="w-[16px] h-[16px] rounded-[8px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/357811045-1987868941549293-8596588435582708190-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0" />
                                          <div className="w-[17px] h-[17px] rounded-[7.5px] border border-solid border-[#00000026] absolute top-0 left-0" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="absolute w-[20px] h-[20px] top-0 left-[12px] bg-white rounded-[10px]">
                                      <div className="relative w-[16px] h-[16px] top-[2px] left-[2px] bg-neutral-100 rounded-[8px]">
                                        <div className="h-[16px]">
                                          <div className="relative w-[17px] h-[17px] rounded-[7.5px]">
                                            <div className="w-[16px] h-[16px] rounded-[8px] bg-[url(https://c.animaapp.com/n1QiTcNd/img/359452161-7212821988744843-2119687233277087413-n-jpg@2x.png)] bg-cover bg-[50%_50%] absolute top-0 left-0" />
                                            <div className="w-[17px] h-[17px] rounded-[7.5px] border border-solid border-[#00000026] absolute top-0 left-0" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute w-[16px] h-[21px] top-[4px] left-[114px]">
                              <div className="absolute w-[12px] h-[18px] top-0 left-[2px] [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
                                {' '}
                                ·
                              </div>
                            </div>
                            <div className="absolute w-[66px] h-[14px] top-[7px] left-[48px]">
                              <div className="absolute w-[66px] h-[18px] top-[-2px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
                                16 replies
                              </div>
                            </div>
                            <button className="absolute w-[72px] h-[14px] top-[7px] left-[130px] all-[unset] box-border">
                              <div className="relative h-[14px]">
                                <div className="absolute w-[72px] h-[18px] top-[-2px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#999999] text-[15px] tracking-[0] leading-[21px] whitespace-nowrap">
                                  3,510 likes
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
