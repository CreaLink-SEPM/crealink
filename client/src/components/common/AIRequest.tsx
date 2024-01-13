import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Input, Upload, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import AutoInput from '@/src/components/common/AutoInput';
import UploadImage from '@/src/components/common/UploadImage';
import DropdownSelect from '@/src/components/common/DropdownSelect';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from "@/src/components/ui/use-toast"
import { notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

