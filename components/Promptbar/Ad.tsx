import { FC } from "react";
import Image from 'next/image'

interface Props {}

export const Ad: FC<Props> = () => {
  return <Image
    src="https://markel-1253714543.cos.ap-singapore.myqcloud.com/mp-logo.png"
    alt="Picture of the author"
    width={500}
    height={500}
  />
};
