import {type ReactNode} from "react";
import {Box} from "@chakra-ui/react";
import "./Content.css";

export const Content = ({children}: {children: ReactNode}) => {
  return (
    <Box className="content">
      {children}
    </Box>
  )
}
