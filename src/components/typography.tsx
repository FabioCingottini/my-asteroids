import {ComponentProps, FC} from "react";
import cn from "classnames";

// set the typescale with https://typescale.com/
// mobile: from 16px, using 1.067
// tablet(md): from 16px, using 1.125
// mobile(xl): from 16px, using 1.200

export const H1: FC<ComponentProps<'h1'>> = (props) => {
  return <h1
    {...props}
    className={cn(
      "text-[1.476rem] md:text-[2.027rem] xl:text-[2.986rem]",
      "leading-tight",
      props.className
    )}
  />
}
export const H3: FC<ComponentProps<'h3'>> = (props) => {
  return <h3
    {...props}
    className={cn(
      "text-[1.296rem] md:text-[1.602rem] xl:text-[2.074rem]",
      "leading-tight",
      props.className
    )}
  />
}
export const P: FC<ComponentProps<'p'>> = (props) => {
  return <p
    {...props}
    className={cn(
      "text-[1rem]",
      "leading-relaxed",
      props.className
    )}
  />
}


